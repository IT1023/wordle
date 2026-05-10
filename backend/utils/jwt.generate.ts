import jwt from "jsonwebtoken"
import "../config/dotenv.ts"
import type { GameState } from "../../shared/types.ts"

const { SECRET_KEY } = process.env

if (!SECRET_KEY) throw new Error('Missing JWT Key')

export const jwtGenerate = {
    generateToken: (payload: GameState): string => {
        try {
            const token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: "1d"
            })
            return token
        } catch (err) {
            console.log(err)
            return ""
        }
    }
}