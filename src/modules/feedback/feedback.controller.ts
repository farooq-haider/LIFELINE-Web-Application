import { Request, Response, NextFunction } from "express";
import { CreateFeedbackDTOSchema } from "./feedback.dto";
import { FeedbackService } from "./feedback.service";

export default class FeedbackController {
  static async createFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedBody = CreateFeedbackDTOSchema.parse({
        rating: parseInt(req.body.rating, 10),
        content: req.body.content,
        userType: req.user.userType,
        userId: req.user.id,
      });
      const newFeedback = await FeedbackService.createFeedback(validatedBody);
      res.status(201).json(newFeedback);
    } catch (error) {
      next(error);
    }
  }
}
