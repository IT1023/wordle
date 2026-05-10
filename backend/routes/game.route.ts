import { Router } from "express";
import { gameController } from "../controllers/game.controller.ts";

const router = Router()

router.get('/', gameController.initiateGame)

export default router