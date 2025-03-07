import { Router } from "express";
import DonorController from "./donor.controller";

const router = Router();

router.get('/', DonorController.getAllDonors);
router.get('/:id', DonorController.getDonorById);
router.post('/', DonorController.createDonor);

export default router;