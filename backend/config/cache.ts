import Redis from "ioredis";
import "./dotenv.ts";

const { REDIS_URL } = process.env;

if (!REDIS_URL) throw new Error("Missing Cache Url");

export const client = new Redis(REDIS_URL);
