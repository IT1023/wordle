import z from "zod"

export const gameStateSchema = z.object({
    status: z.enum(['idle', "running", "won", "failed"]),
    attemptLeft: z.number().max(6).min(0),
    submittedWords: z.array(z.object({
        word: z.string().nonempty(),
        state: z.array(z.enum(['correct', "misplaced", "incorrect"]))
    })),
    createdAt: z.string().nonempty(),
})