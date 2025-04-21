import { Router } from "express";
import DonationHistoryController from "./donationHistory.controller";
import donorAuthMiddleware from "../../middlewares/donorAuth.middleware";

const router = Router();

router.get(
  "/",
  donorAuthMiddleware,
  DonationHistoryController.getAllDonationHistory
);
router.post(
  "/create",
  donorAuthMiddleware,
  DonationHistoryController.createDonationHistory
);

export default router;
