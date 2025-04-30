import bcrypt from "bcrypt";
import RecipientRepository from "./recipient.repository";
import Recipient from "./recipient.entity";
import {
  CreateRecipientDTO,
  LoginRecipientDTO,
  RecipientResponseDTO,
  UpdateRecipientDTO,
} from "./recipient.dto";
import jwt from "jsonwebtoken";
import config from "../../config/config";

export class RecipientService {
  static async createRecipient(data: CreateRecipientDTO): Promise<string> {
    const recipient = await RecipientRepository.findByEmail(data.email);
    if (recipient) {
      throw new Error("Recipient with the email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newRecipient = await RecipientRepository.create(data);
    const userSecret = jwt.sign(
      { recipientId: newRecipient.id, recipientEmail: newRecipient.email },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return userSecret;
  }

  static async loginRecipient(data: LoginRecipientDTO): Promise<string> {
    const recipient = await RecipientRepository.findByEmail(data.email);
    if (!recipient) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(
      data.password,
      recipient.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const userSecret = jwt.sign(
      { recipientId: recipient.id, recipientEmail: recipient.email },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return userSecret;
  }

  static async getRecipientById(id: number): Promise<RecipientResponseDTO> {
    const recipient = await RecipientRepository.findById(id);
    if (!recipient) {
      throw new Error("Donor not found");
    }
    return recipient;
  }

  static async deleteRecipient(id: number): Promise<void> {
    const recipient = await RecipientRepository.findById(id);
    if (!recipient) {
      throw new Error("Donor not found");
    }
    const result = await RecipientRepository.deleteById(id);
    if (!result) {
      throw new Error("Failed to delete donor");
    }

    return;
  }

  static async updateRecipient(
    id: number,
    data: UpdateRecipientDTO
  ): Promise<Boolean> {
    const recipient = await RecipientRepository.findById(id);
    if (!recipient) {
      throw new Error("Donor not found");
    }
    const result = RecipientRepository.update(id, data);
    return result;
  }
}
