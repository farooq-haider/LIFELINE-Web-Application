import { Request, Response, NextFunction } from 'express';
import DonorService from './donor.service';
import { CreateDonorDTOSchema, LoginDonorDTOSchema } from './donor.dto';

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
            const token = await DonorService.createDonor(validatedBody);
            res.status(201).json({userSecret: token});
        } catch (error) {
            next(error);
        }
    }

    static async loginDonor(req: Request, res: Response, next: NextFunction) {
        try {
            const validatedBody = LoginDonorDTOSchema.parse(req.body);
            const token = await DonorService.loginDonor(validatedBody);
            res.status(200).json({ userSecret: token });
        } catch (error) {
            next(error);
        }
    }

    static async deleteAccount(req: Request, res: Response, next: NextFunction) {
        try {
            const donorId = req.user.id;
            await DonorService.deleteDonor(donorId);
            res.status(200).json({ message: 'Donor account deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}