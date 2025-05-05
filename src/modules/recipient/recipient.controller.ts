import { Request, Response, NextFunction } from "express";
import { RecipientService } from "./recipient.service";
import {
  CreateRecipientDTOSchema,
  LoginRecipientDTOSchema,
  RecipientResetPasswordDTOSchema,
  UpdateRecipientDTOSchema,
} from "./recipient.dto";
export default class RecipientController {
  static async createRecipient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedBody = CreateRecipientDTOSchema.parse(req.body);
      const token = await RecipientService.createRecipient(validatedBody);
      res.status(201).json({ userSecret: token });
    } catch (error) {
      next(error);
    }
  }

  static async loginRecipient(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = LoginRecipientDTOSchema.parse(req.body);
      const token = await RecipientService.loginRecipient(validatedBody);
      res.status(200).json({ userSecret: token });
    } catch (error) {
      next(error);
    }
  }

  static async getRecipientById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      console.log(req.user);
      const recipient = await RecipientService.getRecipientById(
        parseInt(req.user.id, 10)
      );
      res.status(200).json({ recipient });
    } catch (error) {
      console.log(error);
      res.status(400);
      next(error);
    }
  }

  static async deleteAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const recipientId = req.user.id;
      await RecipientService.deleteRecipient(recipientId);
      res.status(200).json({ message: "Donor account deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async updateRecipient(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const recipientId = req.user.id;
      const updatedData = UpdateRecipientDTOSchema.parse(req.body);
      const updatedRecipient = await RecipientService.updateRecipient(
        recipientId,
        updatedData
      );
      res.status(200).json(updatedRecipient);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async resetRecipientPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const validatedBody = RecipientResetPasswordDTOSchema.parse(req.body);
      await RecipientService.resetPassword(validatedBody);
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error });
      next(error);
    }
  }

  static async sendResetEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const otp = await RecipientService.sendResetEmail(req.body.email);
      res.status(200).json({
        status: true,
      });
    } catch (e) {
      console.log(e);
      res.status(400);
    }
  }
}
