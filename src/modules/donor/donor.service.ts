import bcrypt from "bcrypt";
import DonorRepository from "./donor.repository";
import Donor from "./donor.entity";
import {
  CreateDonorDTO,
  DonorResponseDTO,
  LoginDonorDTO,
  UpdateDonorDTO,
} from "./donor.dto";
import jwt from "jsonwebtoken";
import config from "../../config/config";

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
    bloodGroup: ValidBloodGroup
  ): Promise<DonorResponseDTO[]> {
    const donors = await DonorRepository.findByLocation(bloodGroup, city);
    if (!donors || donors.length === 0) {
      throw new Error("No donors found in this location");
    }
    return donors;
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
      { donorId: newDonor.id, donorEmail: newDonor.email },
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
      { donorId: donor.id, donorEmail: donor.email },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return userSecret;
  }

  static async updateDonor(
    id: number,
    data: UpdateDonorDTO
  ): Promise<DonorResponseDTO> {
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
}
