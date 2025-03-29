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
        1 //req.user.id
      );
      res.status(200).json(history);
    } catch (error) {
      next(error);
    }
  }

  static async createDonationHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedBody = CreateDonationsHistoryDTOSchema.parse(req.body);
      const history = {
        description: validatedBody.description,
        donor_id: 1, //req.user.id,
      };
      const newDoonation = await DonationHistoryService.createDonationHistory(
        history
      );
      res.status(201).json(newDoonation);
    } catch (error) {
      next(error);
    }
  }
}
