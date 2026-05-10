import type { GameState } from "../../shared/types.ts";

export const gameService = {
  newGame: (): GameState => {
    const gameState: GameState = {
      status: "running",
      attemptLeft: 6,
      createdAt: new Date().toDateString(),
      words: [],
    };
    return gameState;
  },
};
