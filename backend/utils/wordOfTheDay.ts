import type { RowDataPacket } from "mysql2"
import { client } from "../config/cache.ts"
import { db } from "../config/db.ts"

export const wordOfTheDay = async (): Promise<string> => {
    const today = new Date().toDateString()
    const word = await client.get(today)
    if (word) return word
    const connection = db()
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT words FROM wordlist order by rand() limit 1`)
    if (!rows.length) return ""
    const { words } = rows[0]
    await client.set(today, words)
    return words
}