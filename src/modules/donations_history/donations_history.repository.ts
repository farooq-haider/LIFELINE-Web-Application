import AppDataSource from "../../config/ormConfig";
import {
  CreateDonationsHistoryDTO,
  DonationsHistoryResponseDTO,
  DonationsHistoryResponseDTOSchema,
} from "./donations_history.dto";
import DonationHistory from "./donations_history.entity";

export default class DonationHistoryRepository {
  private static donationHistoryRepository =
    AppDataSource.getRepository(DonationHistory);
  private static mapToDTO(
    history: DonationHistory
  ): DonationsHistoryResponseDTO {
    return DonationsHistoryResponseDTOSchema.parse({
      id: history.id,
      donor_id: history.donor,
      description: history.description,
    });
  }
  static async findAll(donor_id: number): Promise<DonationHistory[]> {
    const history = await this.donationHistoryRepository.find({
      where: { donor: { id: donor_id } },
    });
    return history;
  }
  static async create(
    history: CreateDonationsHistoryDTO
  ): Promise<DonationsHistoryResponseDTO> {
    const newEntry = await this.donationHistoryRepository.save(history);
    return this.mapToDTO(newEntry);
  }
}
