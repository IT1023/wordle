import { Router } from "express";
import { resetController } from "../controllers/reset.controller.ts";

const router = Router();

router.post("/", resetController.resetGame);

export default router;
