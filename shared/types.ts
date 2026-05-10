import type z from "zod";
import type { gameStateSchema } from "./schemas";

export type GameState = z.infer<typeof gameStateSchema>;
