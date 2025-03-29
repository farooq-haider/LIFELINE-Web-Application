import { Router } from "express";
import healthCheckRoutes from "../modules/healthCheck/healthCheck.routes";
import donorRoutes from "../modules/donor/donor.routes";
import donationHistoryRoutes from "../modules/donationHistory/donationHistory.routes";
const router = Router();

router.use("/health", healthCheckRoutes);
router.use("/donors", donorRoutes);
router.use("/donationHistory", donationHistoryRoutes);

export default router;
