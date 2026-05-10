import "../config/dotenv.ts"
import type { Request, Response } from "express";
import { parse } from "cookie"
import { jwtVerify } from "../utils/jwt.verify.ts";
import { gameService } from "../services/game.service.ts";
import { jwtGenerate } from "../utils/jwt.generate.ts";


export const gameController = {
    initiateGame: async (req: Request, res: Response) => {
        try {
            // extracting token from cookies
            const cookies = parse(req.headers.cookie ?? "")
            const { token } = cookies

            // verifying if token does exists and represent a valid game state
            const previousGameSate = jwtVerify.verifyToken(token ?? "")
            if (previousGameSate) {
                const { status, submittedWords, attemptLeft, createdAt } = previousGameSate
                return res.status(200).json({ game: { status, submittedWords, attemptLeft, createdAt } })

            }

            // generating a new game state
            const game = gameService.newGame()

            // injecting the new game state into cookie
            res.cookie('token', jwtGenerate.generateToken(game), {
                maxAge: 24 * 60 * 60 * 1000,
                sameSite: "strict",
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "*"
            })

            return res.status(200).json({ game })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ code: "server", message: "Internal Server Error" })
        }
    }
}