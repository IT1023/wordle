import mysql, { type Pool } from "mysql2/promise";
import "./dotenv.ts";

let pool: Pool | undefined = undefined;

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const db = (): Pool => {
  if (!pool) {
    pool = mysql.createPool({
      host: DB_HOST,
      port: Number(DB_PORT),
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      connectionLimit: 10,
      queueLimit: 5,
      waitForConnections: true,
    });
  }
  return pool;
};
