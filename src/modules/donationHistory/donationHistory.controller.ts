import { Request, Response, NextFunction } from "express";
import DonationHistoryService from "./donationHistory.service";
import { CreateDonationsHistoryDTOSchema } from "./donationHistory.dto";

export default class DonationHistoryController {
  static async getAllDonationHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const history = await DonationHistoryService.getAllDonationsFromUser(
        req.user.id
      );
      res.status(200).json({ history });
    } catch (error) {
      res.status(401);
      next(error);
    }
  }

  static async createDonationHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedBody = CreateDonationsHistoryDTOSchema.parse({
        donationDate: new Date(req.body.donationDate),
        volume: parseInt(req.body.volume, 10),
      });
      const history = {
        volume: validatedBody.volume,
        donor_id: req.user.id,
        donationDate: validatedBody.donationDate,
      };
      const newDoonation = await DonationHistoryService.createDonationHistory(
        history
      );
      res.status(201).json(newDoonation);
    } catch (error) {
      console.log(error);
      res.status(501);
      next(error);
    }
  }
}
