import { Router } from "express";
import { postWordController } from "../controllers/postWord.controller.ts";

const router = Router();

router.post("/", postWordController.postWord);

export default router;
