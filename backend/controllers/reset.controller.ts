import type { Request, Response } from "express";
import { gameService } from "../services/game.service.ts";
import { jwtGenerate } from "../utils/jwt.generate.ts";

export const resetController = {
  resetGame: (_: Request, res: Response) => {
    const game = gameService.newGame();
    res.cookie("token", jwtGenerate.generateToken(game), {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "*",
    });
    return res.status(200).json({ game });
  },
};
