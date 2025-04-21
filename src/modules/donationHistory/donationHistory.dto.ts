import { z } from "zod";

export const CreateDonationsHistoryDTOSchema = z.object({
  description: z.string(),
  donationDate: z.date(),
});

export const DonationsHistoryResponseDTOSchema = z.object({
  donor_id: z.number().int().positive(),
  description: z.string(),
  donationDate: z.date(),
});

export type CreateDonationsHistoryDTO = z.infer<
  typeof CreateDonationsHistoryDTOSchema
>;
export type DonationsHistoryResponseDTO = z.infer<
  typeof DonationsHistoryResponseDTOSchema
>;
