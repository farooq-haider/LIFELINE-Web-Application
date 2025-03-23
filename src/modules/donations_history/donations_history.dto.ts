import { z } from "zod";

export const CreateDonationsHistoryDTOSchema = z.object({
  donor_id: z.number().int().positive(),
  description: z.string(),
});

export const DonationsHistoryResponseDTOSchema = z.object({
  id: z.number().int().positive(),
  donor_id: z.number().int().positive(),
  description: z.string(),
});

export type CreateDonationsHistoryDTO = z.infer<
  typeof CreateDonationsHistoryDTOSchema
>;
export type DonationsHistoryResponseDTO = z.infer<
  typeof DonationsHistoryResponseDTOSchema
>;
