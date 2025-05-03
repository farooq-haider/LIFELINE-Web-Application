import { Request, Response, NextFunction } from "express";
import { TogetherAIService } from "./togetherAI.service";

export default class TogetherAIController {
  static async chatBot(req: Request, res: Response, next: NextFunction) {
    try {
      // const { prompt } = req.body;
      const response = await TogetherAIService.eligibilityCheck(req.body);
      res.status(200).json({ response });
    } catch (error) {
      next(error);
    }
  }
}
