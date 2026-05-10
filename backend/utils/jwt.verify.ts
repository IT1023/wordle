import jwt from "jsonwebtoken";
import "../config/dotenv.ts";
import type { GameState } from "../../shared/types.ts";
import { gameStateSchema } from "../../shared/schemas.ts";
import z from "zod";

const { SECRET_KEY } = process.env;

if (!SECRET_KEY) throw new Error("Missing JWT Key");

export const jwtVerify = {
  verifyToken: (token: string): GameState | undefined => {
    try {
      // verifying token
      const payload = jwt.verify(token, SECRET_KEY);

      // verifying if payload is valid
      const parsed = gameStateSchema
        .extend({
          iat: z.number().nonnegative(),
          exp: z.number().nonnegative(),
        })
        .safeParse(payload);
      if (!parsed.success) return undefined;

      // verifying if token is still within the day
      const { createdAt, status, attemptLeft, words } = parsed.data;
      if (createdAt !== new Date().toDateString()) return undefined;

      return { status, attemptLeft, words, createdAt };
    } catch (err) {
      console.log(err);
      return undefined;
    }
  },
};
