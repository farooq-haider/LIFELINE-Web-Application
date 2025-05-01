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
      req.body.donationDate = new Date(req.body.donationDate);
      const validatedBody = CreateDonationsHistoryDTOSchema.parse(req.body);
      const history = {
        description: validatedBody.description,
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
