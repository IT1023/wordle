import type { RowDataPacket } from "mysql2";
import { client } from "../config/cache.ts";
import { db } from "../config/db.ts";

export const todayServices = {
  fetchWordOfTheDay: async () => {
    const key = new Date().toDateString();
    const cache = await client.get(key);
    if (cache) return cache;
    const connection = db();
    const [word] = await connection.query<RowDataPacket[]>(
      "SELECT words from wordlist order by rand() limit 1",
    );
    if (!word.length) throw new Error("No words in db");
    const { words } = word[0];
    await client.set(key, words as string);
    return words;
  },
};
