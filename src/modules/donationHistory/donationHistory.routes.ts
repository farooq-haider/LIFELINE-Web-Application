import { Router } from "express";
import DonationHistoryController from "./donationHistory.controller";

const router = Router();

router.get("/", DonationHistoryController.getAllDonationHistory);
router.post("/create", DonationHistoryController.createDonationHistory);

export default router;
