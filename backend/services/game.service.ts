import type { GameState } from "../../shared/types.ts"

export const gameService = {
    newGame: (): GameState => {
        const gameState: GameState = {
            status: "idle",
            "attemptLeft": 6,
            "createdAt": new Date().toDateString(),
            "submittedWords": []
        }
        return gameState
    }
}