import bcrypt from "bcrypt";
import RecipientRepository from "./recipient.repository";
import Recipient from "./recipient.entity";
import { CreateRecipientDTO, LoginRecipientDTO } from "./recipient.dto";
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
      {
        id: newRecipient.id,
        email: newRecipient.email,
        userType: "RECIPIENT",
      },
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
}
