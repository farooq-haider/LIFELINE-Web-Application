import DonationHistoryRepository from "./donationHistory.repository";
import DonationHistory from "./donationHistory.entity";
import { CreateDonationsHistoryDTO } from "./donationHistory.dto";

export default class DonationHistoryService {
  static async getAllDonationsFromUser(id: number): Promise<DonationHistory[]> {
    const history = await DonationHistoryRepository.findAll(id);
    return history;
  }

  static async createDonationHistory(
    data: CreateDonationsHistoryDTO
  ): Promise<boolean> {
    const newHistory = await DonationHistoryRepository.create(data);
    if (newHistory) return true;
    else return false;
  }
}
