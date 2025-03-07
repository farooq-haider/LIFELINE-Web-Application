import { Request, Response, NextFunction } from 'express';
import DonorService from './donor.service';
import { CreateDonorDTOSchema } from './donor.dto';

export default class DonorController {
    static async getAllDonors(req: Request, res: Response, next: NextFunction) {
        try {
            const donors = await DonorService.getAllDonors();
            res.status(200).json(donors);
        } catch (error) {
            next(error);
        }
    }

    static async getDonorById(req: Request, res: Response, next: NextFunction) {
        try {
            const donor = await DonorService.getDonorById(Number(req.params.id));
            res.status(200).json(donor);
        } catch (error) {
            next(error);
        }
    }

    static async createDonor(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedBody = CreateDonorDTOSchema.parse(req.body);
            const newDonor = await DonorService.createDonor(validatedBody);
            res.status(201).json(newDonor);
        } catch (error) {
            next(error);
        }
    }
}