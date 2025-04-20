import AppDataSource from "../../config/ormConfig";
import {
  CreateDonorDTO,
  DonorResponseDTO,
  DonorResponseDTOSchema,
  UpdateDonorDTO,
} from "./donor.dto";
import Donor from "./donor.entity";

export default class DonorRepository {
  private static donorRepository = AppDataSource.getRepository(Donor);

  private static mapToDTO(donor: Donor): DonorResponseDTO {
    return DonorResponseDTOSchema.parse({
      id: donor.id,
      name: donor.name,
      email: donor.email,
      bloodGroup: donor.bloodGroup,
      lastDonation:
        donor.lastDonation instanceof Date
          ? donor.lastDonation.toISOString()
          : donor.lastDonation,
      phone: donor.phone,
      address: donor.address,
      city: donor.city,
      isActive: donor.isActive,
      createdAt: donor.createdAt,
      updatedAt: donor.updatedAt,
    });
  }

  static async findAll(): Promise<DonorResponseDTO[]> {
    const donors = await this.donorRepository.find();
    return donors.map(this.mapToDTO);
  }

  static async findById(id: number): Promise<DonorResponseDTO | null> {
    const donor = await this.donorRepository.findOne({ where: { id } });
    return donor ? this.mapToDTO(donor) : null;
  }

  static async findByLocation(
    bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-",
    city: string
  ): Promise<DonorResponseDTO[]> {
    const donors = await this.donorRepository.find({
      where: { city, bloodGroup },
    });
    return donors.map(this.mapToDTO);
  }

  static async findByEmail(email: string): Promise<Donor | null> {
    const donor = await this.donorRepository.findOne({ where: { email } });
    return donor;
  }

  static async create(donor: CreateDonorDTO): Promise<DonorResponseDTO> {
    const newDonor = await this.donorRepository.save(donor);
    return this.mapToDTO(newDonor);
  }

  static async update(
    id: number,
    donor: UpdateDonorDTO
  ): Promise<DonorResponseDTO> {
    const user = await this.donorRepository.findOne({ where: { id } });
    await this.donorRepository.save({ ...donor, id });
    if (user) {
      Object.assign(user, donor);
      return this.mapToDTO(user);
    }
    throw new Error("User not found");
  }

  static async deleteById(id: number): Promise<boolean> {
    const deleted = await this.donorRepository.delete(id);
    return deleted.affected !== 0;
  }
}
