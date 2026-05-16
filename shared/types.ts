import type z from "zod";
import type { gameStateSchema, wordSchema } from "./schemas";

export type GameState = z.infer<typeof gameStateSchema>;

export type PostWord = z.infer<typeof wordSchema>;
