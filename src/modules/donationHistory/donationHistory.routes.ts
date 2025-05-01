import { Router } from "express";
import DonationHistoryController from "./donationHistory.controller";
import userAuthMiddleware from "../../middlewares/userAuth.middleware";

const router = Router();

router.get(
  "/",
  userAuthMiddleware,
  DonationHistoryController.getAllDonationHistory
);
router.post(
  "/create",
  userAuthMiddleware,
  DonationHistoryController.createDonationHistory
);

export default router;
