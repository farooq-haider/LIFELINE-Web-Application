import AppDataSource from "../../config/ormConfig";
import {
  CreateRecipientDTO,
  RecipientResponseDTOSchema,
  RecipientResponseDTO,
} from "./recipient.dto";
import Recipient from "./recipient.entity";

export default class DonorRepository {
  private static RecipientRepository = AppDataSource.getRepository(Recipient);

  private static mapToDTO(recipient: Recipient): RecipientResponseDTO {
    return RecipientResponseDTOSchema.parse({
      id: recipient.id,
      name: recipient.name,
      email: recipient.email,
      phone: recipient.phone,
      address: recipient.address,
      city: recipient.city,
      createdAt: recipient.createdAt,
      updatedAt: recipient.updatedAt,
    });
  }

  static async findByEmail(email: string): Promise<Recipient | null> {
    const recipient = await this.RecipientRepository.findOne({
      where: { email },
    });
    return recipient;
  }

  static async create(
    recipient: CreateRecipientDTO
  ): Promise<RecipientResponseDTO> {
    const newRecipient = await this.RecipientRepository.save(recipient);
    return this.mapToDTO(newRecipient);
  }
}
