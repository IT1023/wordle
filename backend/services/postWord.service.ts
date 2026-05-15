import type { RowDataPacket } from "mysql2";
import type { GameState } from "../../shared/types.ts";
import { client } from "../config/cache.ts";
import { db } from "../config/db.ts";

type Word = {
  count: number;
  idx: Set<number>;
};

type Case = GameState["words"][number];

export const postWordService = {
  isValidWord: async function (word: string): Promise<boolean> {
    const connection = db();
    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT words FROM wordlist WHERE words = ?`,
      [word],
    );
    if (!rows.length) return false;
    return true;
  },
  // retreive word of the day from cache if it exists, otherwise fetch random word from db and then save to cache
  getWordOfTheDay: async function (): Promise<string> {
    const today = new Date().toDateString();
    const word = await client.get(today);
    // cache hit
    if (word) return word;
    // generating a new word of the day
    const connection = db();
    const [maxRow] = await connection.query<RowDataPacket[]>(
      `SELECT COUNT(*) as offset FROM wordlist`,
    );
    if (!maxRow.length) return "";

    const { offset } = maxRow[0];
    const rand = Math.floor(Math.random() * offset);

    const [rows] = await connection.query<RowDataPacket[]>(
      `SELECT words FROM wordlist limit 1 offset ?`,
      [rand],
    );
    if (!rows.length) return "";
    const { words } = rows[0];
    // saving to cache
    await client.set(today, words, "EX", 60 * 60 * 24);
    return words;
  },
  // build a map from word of the day, with each char as a key and its count and positions as values
  buildWordOfTheDayMap: async function (): Promise<Map<string, Word>> {
    const wordOfTheDay = await this.getWordOfTheDay();
    const wordOfTheDayChars = new Map<string, Word>();
    for (const [index, char] of [...wordOfTheDay].entries()) {
      const { count, idx } = wordOfTheDayChars.get(char) || {
        count: 0,
        idx: new Set(),
      };
      idx.add(Number(index));
      wordOfTheDayChars.set(char, {
        count: count + 1,
        idx,
      });
    }
    return wordOfTheDayChars;
  },
  verifyWord: async function (word: string): Promise<Case> {
    const wordOfTheDayChars = await this.buildWordOfTheDayMap();
    // initialize all positions as incorrect
    const res: Case["state"] = Array.from({ length: 5 }, () => "incorrect");

    // first traverse for correct and in correct positions chars
    word.split("").forEach((char, index) => {
      if (wordOfTheDayChars.has(char)) {
        const { count, idx } = wordOfTheDayChars.get(char)!;
        if (!!count && idx.has(index)) {
          res[index] = "correct";
          idx.delete(index);
          wordOfTheDayChars.set(char, {
            count: count - 1,
            idx,
          });
        }
      }
    });

    // second iterations for misplaced char
    word.split("").forEach((char, index) => {
      if (wordOfTheDayChars.has(char)) {
        const { count, idx } = wordOfTheDayChars.get(char)!;
        if (count) {
          res[index] = "misplaced";
          wordOfTheDayChars.set(char, {
            count: count - 1,
            idx,
          });
        }
      }
    });

    return { word, state: res };
  },
};
