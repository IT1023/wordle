import type { Request, Response } from "express";
import { todayServices } from "../services/today.service.ts";

export const todayController = {
  fetchWordOfTheDay: async (_: Request, res: Response) => {
    try {
      const word = await todayServices.fetchWordOfTheDay();
      return res.status(200).json({ word });
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ code: "server", message: "Internal Server Error" });
    }
  },
};
