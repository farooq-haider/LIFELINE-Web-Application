import { Router } from "express";
import healthCheckRoutes from "../modules/healthCheck/healthCheck.routes"
import donorRoutes from "../modules/donor/donor.routes"

const router = Router();

router.use('/health', healthCheckRoutes);
router.use('/donors', donorRoutes);

export default router;