import { CreateFeedbackDTO, FeedbackResponseDTO } from "./feedback.dto";
import FeedbackRepository from "./feedback.repository";

export class FeedbackService {
  static async createFeedback(
    data: CreateFeedbackDTO
  ): Promise<FeedbackResponseDTO> {
    const feedback = await FeedbackRepository.create(data);
    return feedback;
  }
}
