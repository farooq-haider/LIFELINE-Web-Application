import bcrypt from 'bcrypt';
import DonorRepository from './donor.repository';
import Donor from './donor.entity';
import { CreateDonorDTO, DonorResponseDTO } from './donor.dto';

export default class DonorService {
    static async getAllDonors(): Promise<Donor[]> {
        const donors = await DonorRepository.findAll();
        return donors;
    }

    static async getDonorById(id: number): Promise<Donor> {
        const donor = await DonorRepository.findById(id);
        if (!donor) {
            throw new Error('Donor not found');
        }
        return donor;
    }

    static async getDonorByEmail(email: string): Promise<Donor> {
        const donor = await DonorRepository.findByEmail(email);
        if (!donor) {
            throw new Error('Donor not found');
        }
        return donor;
    }

    static async createDonor(data: CreateDonorDTO): Promise<DonorResponseDTO> {
        const donor = await DonorRepository.findByEmail(data.email);
        if (donor) {
            throw new Error('Donor with the email already exists');
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);
        data.password = hashedPassword;
        const newDonor = await DonorRepository.create(data);
        return newDonor;
    }
}