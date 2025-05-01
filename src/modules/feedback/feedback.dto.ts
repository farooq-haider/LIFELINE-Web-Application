import { z } from "zod";

// const userType = z.enum(["DONOR", "RECIPIENT"]);

const CreateFeedbackDTOSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(500),
  userType: z.enum(["DONOR", "RECIPIENT"]),
  userId: z.number().int().positive(),
});

const UpdateFeedbackDTOSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  content: z.string().min(1).max(500).optional(),
});

const FeedbackResponseDTOSchema = z.object({
  id: z.number(),
  rating: z.number().min(1).max(5),
  content: z.string().min(1).max(500),
  userType: z.enum(["DONOR", "RECIPIENT"]),
  userId: z.number().int().positive(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateFeedbackDTO = z.infer<typeof CreateFeedbackDTOSchema>;
export type UpdateFeedbackDTO = z.infer<typeof UpdateFeedbackDTOSchema>;
export type FeedbackResponseDTO = z.infer<typeof FeedbackResponseDTOSchema>;
export {
  CreateFeedbackDTOSchema,
  UpdateFeedbackDTOSchema,
  FeedbackResponseDTOSchema,
};
