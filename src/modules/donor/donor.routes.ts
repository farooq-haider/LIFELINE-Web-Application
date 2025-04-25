import { Router } from "express";
import DonorController from "./donor.controller";
import donorAuthMiddleware from "../../middlewares/donorAuth.middleware";

const router = Router();

router.post("/login", DonorController.loginDonor);
router.post("/signup", DonorController.createDonor);
router.post("/search", DonorController.searchDonors);
router.delete("/delete", donorAuthMiddleware, DonorController.deleteAccount);
router.get("/", donorAuthMiddleware, DonorController.getAllDonors);
router.put("/reset-password", DonorController.resetDonorPassword);

router.post("/getDonor", donorAuthMiddleware, DonorController.getDonorById);
router.put("/:id", donorAuthMiddleware, DonorController.updateDonor);

router.post("/otp", DonorController.sendOtpEmail);

export default router;
