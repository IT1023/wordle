import { parse } from "cookie";
import type { Request, Response } from "express";
import { jwtVerify } from "../utils/jwt.verify.ts";
import { wordSchema } from "../../shared/schemas.ts";
import { postWordService } from "../services/postWord.service.ts";
import type { GameState } from "../../shared/types.ts";
import { jwtGenerate } from "../utils/jwt.generate.ts";

export const postWordController = {
  postWord: async (req: Request, res: Response) => {
    const cookies = parse(req.headers.cookie ?? "");
    const { token } = cookies;
    const previousGameState = jwtVerify.verifyToken(token ?? "");
    if (!previousGameState)
      return res
        .status(400)
        .json({ code: "badRequest", message: "Game has not been initiated" });

    if (
      previousGameState.status === "won" ||
      previousGameState.status === "failed"
    )
      return res.status(200).json({ game: previousGameState });

    const parsed = wordSchema.safeParse(req.body);
    if (!parsed.success)
      return res.status(400).json({
        code: "badRequest",
        message: "Non valid word in post request",
      });

    const { word } = parsed.data;
    const match = await postWordService.verifyWord(word);
    const { attemptLeft, words, createdAt } = previousGameState;
    const status: GameState["status"] =
      match.state.filter((s) => s === "correct").length === 5
        ? "won"
        : attemptLeft === 1
          ? "failed"
          : "running";
    words.push(match);
    const newGameState: GameState = {
      status,
      attemptLeft: attemptLeft - 1,
      words,
      createdAt,
    };
    res.cookie("token", jwtGenerate.generateToken(newGameState), {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "*",
    });

    return res.status(200).json({
      game: newGameState,
    });
  },
};
