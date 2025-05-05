import bcrypt from "bcrypt";
import RecipientRepository from "./recipient.repository";
import Recipient from "./recipient.entity";
import nodemailer from "nodemailer";
import {
  CreateRecipientDTO,
  LoginRecipientDTO,
  RecipientResetPasswordDTO,
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
      { id: recipient.id, email: recipient.email, userType: "RECIPIENT" },
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

  static async resetPassword(data: RecipientResetPasswordDTO): Promise<void> {
    const rec = await RecipientRepository.findByEmail(data.email);
    if (!rec) {
      throw new Error("Donor not found");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const result = await RecipientRepository.update(rec.id, data);
    if (!result) {
      throw new Error("Failed to update password");
    }
  }

  static async sendResetEmail(email: string): Promise<boolean> {
    const donor = await RecipientRepository.findByEmail(email);
    if (!donor) {
      throw new Error("Donor not found");
    }

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink =
      "http://127.0.0.1:5500/frontend/RecResetPassword/RecResetPassword.html";

    const mailOptions = {
      from: `LIFELINE Support <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your LIFELINE Password",
      html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #f9fafb;">
        <h2 style="color: #1e40af; text-align: center;">Reset Your Password</h2>
        <p style="font-size: 16px; color: #111827;">
          We received a request to reset your password for your <strong>LIFELINE</strong> account.
        </p>
        <p style="font-size: 16px; color: #111827;">
          Click the button below to reset it:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #3b82f6; color: #fff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-size: 16px;">
            Reset Password
          </a>
        </div>
        <p style="font-size: 14px; color: #6b7280;">
          This link will expire in 10 minutes. If you did not request a password reset, no further action is required.
        </p>
        <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
        <p style="font-size: 12px; color: #9ca3af; text-align: center;">
          © ${new Date().getFullYear()} LIFELINE. All rights reserved.
        </p>
      </div>
    `,
    };

    try {
      await transporter.sendMail(mailOptions);
      return true; // Store this in DB for verification
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  }
}
