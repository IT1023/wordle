import z from "zod";

export const gameStateSchema = z
  .object({
    status: z.enum(["idle", "running", "won", "failed"]),
    attemptLeft: z.number().max(6).min(0),
    words: z.array(
      z.object({
        word: z.string().nonempty(),
        state: z.array(z.enum(["correct", "misplaced", "incorrect"])),
      }),
    ),
    createdAt: z.string().nonempty(),
  })
  .superRefine((val, ctx) => {
    if (val.words.length + val.attemptLeft !== 6) {
      ctx.addIssue({
        code: "custom",
        message: "cheat",
        path: ["words"],
      });
    }
  });

export const wordSchema = z.object({
  word: z.string().length(5),
});
