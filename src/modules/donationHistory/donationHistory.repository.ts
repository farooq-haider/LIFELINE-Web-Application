import AppDataSource from "../../config/ormConfig";
import {
  CreateDonationsHistoryDTO,
  DonationsHistoryResponseDTO,
  DonationsHistoryResponseDTOSchema,
} from "./donationHistory.dto";
import DonationHistory from "./donationHistory.entity";

export default class DonationHistoryRepository {
  private static donationHistoryRepository =
    AppDataSource.getRepository(DonationHistory);
  private static mapToDTO(
    history: DonationHistory
  ): DonationsHistoryResponseDTO {
    return DonationsHistoryResponseDTOSchema.parse({
      id: history.id,
      donor_id: history.donor_id,
      description: history.description,
      donationDate: history.donationDate,
    });
  }
  static async findAll(donor_id: number): Promise<DonationHistory[]> {
    const history = await this.donationHistoryRepository.find({
      where: { donor_id: { id: donor_id } },
    });
    return history;
  }

  static async create(
    history: CreateDonationsHistoryDTO
  ): Promise<DonationsHistoryResponseDTO> {
    const newEntry = await this.donationHistoryRepository.create(history);
    return this.mapToDTO(newEntry);
  }
}
