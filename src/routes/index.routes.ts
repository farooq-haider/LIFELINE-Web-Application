import { Router } from "express";
import healthCheckRoutes from "../modules/healthCheck/healthCheck.routes";
import donorRoutes from "../modules/donor/donor.routes";
import donationHistoryRoutes from "../modules/donationHistory/donationHistory.routes";
import RecipientRoutes from "../modules/recipient/recipient.routes";
import donorAuthMiddleware from "../middlewares/donorAuth.middleware";
import togetherAIRoutes from "../modules/togetherAI/togetherAI.routes";
const router = Router();

router.use("/health", donorAuthMiddleware, healthCheckRoutes);
router.use("/donors", donorRoutes);
router.use("/donationHistory", donorAuthMiddleware, donationHistoryRoutes);
router.use("/recipients", RecipientRoutes);
router.use("/chatbot", togetherAIRoutes);

export default router;
