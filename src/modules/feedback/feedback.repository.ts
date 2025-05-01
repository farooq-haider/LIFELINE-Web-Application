import AppDataSource from "../../config/ormConfig";
import {
  CreateFeedbackDTO,
  FeedbackResponseDTO,
  FeedbackResponseDTOSchema,
} from "./feedback.dto";
import Feedback from "./feedback.entity";

export default class FeedbackRepository {
  private static RecipientRepository = AppDataSource.getRepository(Feedback);

  private static mapToDTO(recipient: Feedback): FeedbackResponseDTO {
    return FeedbackResponseDTOSchema.parse({
      id: recipient.id,
      rating: recipient.rating,
      content: recipient.content,
      userType: recipient.userType,
      userId: recipient.userId,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
    });
  }

  static async create(
    feedback: CreateFeedbackDTO
  ): Promise<FeedbackResponseDTO> {
    const newFeedback = await this.RecipientRepository.save(feedback);
    return this.mapToDTO(newFeedback);
  }
}
