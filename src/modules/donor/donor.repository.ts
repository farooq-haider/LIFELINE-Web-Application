import AppDataSource from "../../config/ormConfig";
import { CreateDonorDTO, DonorResponseDTO, DonorResponseDTOSchema } from "./donor.dto";
import Donor from "./donor.entity";

export default class DonorRepository {
    private static donorRepository = AppDataSource.getRepository(Donor);

    private static mapToDTO(donor: Donor): DonorResponseDTO {
        return DonorResponseDTOSchema.parse({
            id: donor.id,
            name: donor.name,
            email: donor.email,
            bloodGroup: donor.bloodGroup,
            lastDonation: donor.lastDonation,
            phone: donor.phone,
            address: donor.address,
            city: donor.city,
            isActive: donor.isActive,
            createdAt: donor.createdAt,
            updatedAt: donor.updatedAt
        })
    }

    static async findAll(): Promise<Donor[]> {
        const donors = await this.donorRepository.find();
        return donors;
    }

    static async findById(id: number): Promise<Donor | null> {
        const donor = await this.donorRepository.findOne({ where: {id}});
        return donor;
    }

    static async findByEmail(email: string): Promise<Donor | null> {
        const donor = await this.donorRepository.findOne({ where: {email}});
        return donor;
    }

    static async create(donor: CreateDonorDTO): Promise<DonorResponseDTO> {
        const newDonor = await this.donorRepository.save(donor);
        return this.mapToDTO(newDonor);
    }
}