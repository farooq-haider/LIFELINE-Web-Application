import { Router } from "express";
import TogetherAIController from "./togetherAI.controller";

const router = Router();

router.post("/", TogetherAIController.chatBot);

export default router;
