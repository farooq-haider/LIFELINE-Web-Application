import nodemailer from "nodemailer";
import crypto from "crypto";
import bcrypt from "bcrypt";
import DonorRepository from "./donor.repository";
import Donor from "./donor.entity";
import {
  CreateDonorDTO,
  DonorResetPasswordDTO,
  DonorResponseDTO,
  LoginDonorDTO,
  UpdateDonorDTO,
} from "./donor.dto";
import jwt from "jsonwebtoken";
import config from "../../config/config";
import DonationHistoryService from "../donationHistory/donationHistory.service";
import { TogetherAIService } from "../togetherAI/togetherAI.service";

export enum ValidBloodGroup {
  APositive = "A+",
  ANegative = "A-",
  BPositive = "B+",
  BNegative = "B-",
  ABPositive = "AB+",
  ABNegative = "AB-",
  OPositive = "O+",
  ONegative = "O-",
}

export class DonorService {
  static async getAllDonors(): Promise<DonorResponseDTO[]> {
    const donors = await DonorRepository.findAll();
    return donors;
  }

  static async getDonorById(id: number): Promise<DonorResponseDTO> {
    const donor = await DonorRepository.findById(id);
    if (!donor) {
      throw new Error("Donor not found");
    }
    return donor;
  }

  static async getDonorByEmail(email: string): Promise<Donor> {
    const donor = await DonorRepository.findByEmail(email);
    if (!donor) {
      throw new Error("Donor not found");
    }
    return donor;
  }

  static async getDonorsByLocation(
    city: string,
    bloodGroup: ValidBloodGroup,
    verified: string
  ): Promise<DonorResponseDTO[]> {
    const donors = await DonorRepository.findByLocation(
      bloodGroup,
      city,
      verified
    );
    if (!donors || donors.length === 0) {
      throw new Error("No donors found in this location");
    }
    return donors;
  }

  static async resetPassword(data: DonorResetPasswordDTO): Promise<void> {
    const donor = await DonorRepository.findByEmail(data.email);
    if (!donor) {
      throw new Error("Donor not found");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const result = await DonorRepository.update(donor.id, data);
    if (!result) {
      throw new Error("Failed to update password");
    }
  }

  static async createDonor(data: CreateDonorDTO): Promise<string> {
    const donor = await DonorRepository.findByEmail(data.email);
    if (donor) {
      throw new Error("Donor with the email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    const newDonor = await DonorRepository.create(data);
    const userSecret = jwt.sign(
      { id: newDonor.id, email: newDonor.email, userType: "DONOR" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return userSecret;
  }

  static async loginDonor(data: LoginDonorDTO): Promise<string> {
    const donor = await DonorRepository.findByEmail(data.email);
    if (!donor) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(data.password, donor.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const userSecret = jwt.sign(
      { id: donor.id, email: donor.email, userType: "DONOR" },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return userSecret;
  }

  static async updateDonor(id: number, data: UpdateDonorDTO): Promise<Boolean> {
    const donor = await DonorRepository.findById(id);
    if (!donor) {
      throw new Error("Donor not found");
    }
    const result = DonorRepository.update(id, data);
    return result;
  }

  static async deleteDonor(id: number): Promise<void> {
    const donor = await DonorRepository.findById(id);
    if (!donor) {
      throw new Error("Donor not found");
    }
    const result = await DonorRepository.deleteById(id);
    if (!result) {
      throw new Error("Failed to delete donor");
    }

    return;
  }

  static async sendOtpEmail(email: string): Promise<string> {
    const otp = crypto.randomBytes(3).toString("hex"); // 6-digit hex OTP

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `LIFELINE Support <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for LIFELINE Signup",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #3b82f6;">LIFELINE Verification Code</h2>
          <p>Use the following OTP to complete your signup:</p>
          <div style="font-size: 24px; font-weight: bold; margin: 20px 0; color: #2563eb;">${otp}</div>
          <p>This OTP will expire in 10 minutes.</p>
          <p style="font-size: 12px; color: #888;">If you didn’t request this, just ignore this email.</p>
        </div>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
      return otp; // Store this in DB for verification
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw error;
    }
  }

  static async sendResetEmail(email: string): Promise<boolean> {
    const donor = await DonorRepository.findByEmail(email);
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
      "http://127.0.0.1:5500/frontend/DonorResetPassword/DonorResetPassword.html";

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

  static async getVerified(donorId: number): Promise<boolean> {
    const donations = await DonationHistoryService.getAllDonationsFromUser(
      donorId
    );

    const eligibility = await TogetherAIService.eligibilityCheck({
      bloodDonations: donations,
    });

    if (eligibility === "true") {
      this.updateDonor(donorId, { verified: true });
    }

    return "true" === eligibility;
  }
}
