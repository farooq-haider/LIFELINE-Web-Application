import { Router } from "express";
import healthCheckRoutes from "../modules/healthCheck/healthCheck.routes"

const router = Router();

router.use('/health', healthCheckRoutes);

export default router;