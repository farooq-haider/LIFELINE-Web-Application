import { Router } from "express";
import FeedbackController from "./feedback.controller";

const router = Router();

router.post("/create", FeedbackController.createFeedback);

export default router;
