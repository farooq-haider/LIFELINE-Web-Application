import { Request, Response, NextFunction } from "express";
import { RecipientService } from "./recipient.service";
import {
  CreateRecipientDTOSchema,
  LoginRecipientDTOSchema,
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
}
