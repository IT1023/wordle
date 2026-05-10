import type { GameState } from "../../shared/types.ts";
import { client } from "../config/cache.ts";

type Case = GameState["words"][number];

export const postWordService = {
  verifyWord: async (word: string): Promise<Case> => {
    const today = new Date().toDateString();
    const wordOfTheDay = (await client.get(today)) as string;
    const wordOfTheDayChars = wordOfTheDay.split("");
    const res: Case["state"] = Array.from({ length: 5 }, () => "incorrect");
    word.split("").forEach((char, idx) => {
      if (char === wordOfTheDayChars[idx]) {
        res[idx] = "correct";
        wordOfTheDayChars[idx] = "";
      } else {
        if (wordOfTheDayChars.includes(char)) res[idx] = "misplaced";
      }
    });
    return { word, state: res };
  },
};
