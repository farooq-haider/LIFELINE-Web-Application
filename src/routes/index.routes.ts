import { Router } from "express";
import healthCheckRoutes from "../modules/healthCheck/healthCheck.routes";
import donorRoutes from "../modules/donor/donor.routes";
import donationHistoryRoutes from "../modules/donationHistory/donationHistory.routes";
import RecipientRoutes from "../modules/recipient/recipient.routes";
import userAuthMiddleware from "../middlewares/userAuth.middleware";
import togetherAIRoutes from "../modules/togetherAI/togetherAI.routes";
import feedbackRoutes from "../modules/feedback/feedback.routes";
const router = Router();

router.use("/health", healthCheckRoutes);
router.use("/donors", donorRoutes);
router.use("/donationHistory", userAuthMiddleware, donationHistoryRoutes);
router.use("/recipients", RecipientRoutes);
router.use("/chatbot", togetherAIRoutes);
router.use("/feedback", userAuthMiddleware, feedbackRoutes);

export default router;
