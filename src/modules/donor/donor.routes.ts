import { Router } from "express";
import DonorController from "./donor.controller";

const router = Router();

router.get('/', DonorController.getAllDonors);
router.post('/login', DonorController.loginDonor);
router.post('/signup', DonorController.createDonor);
router.get('/:id', DonorController.getDonorById);

export default router;