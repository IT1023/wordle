import { Router } from "express";
import { todayController } from "../controllers/today.controller.ts";

const router = Router();

router.get("/", todayController.fetchWordOfTheDay);

export default router;
