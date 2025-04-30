import AppDataSource from "../../config/ormConfig";
import {
  CreateRecipientDTO,
  RecipientResponseDTOSchema,
  RecipientResponseDTO,
  UpdateRecipientDTO,
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

  static async findById(id: number): Promise<RecipientResponseDTO | null> {
    const recipient = await this.RecipientRepository.findOne({ where: { id } });
    return recipient ? this.mapToDTO(recipient) : null;
  }

  static async deleteById(id: number): Promise<boolean> {
    const deleted = await this.RecipientRepository.delete(id);
    return deleted.affected !== 0;
  }

  static async update(
    id: number,
    recipient: UpdateRecipientDTO
  ): Promise<Boolean> {
    const user = await this.RecipientRepository.update({ id }, recipient);
    if (user) {
      return true;
    }
    throw new Error("User not found");
  }
}
