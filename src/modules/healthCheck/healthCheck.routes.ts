import { Router } from "express";
import healthCheck from "./healthCheck.controller";

const router = Router();

router.get('/', healthCheck);

export default router;