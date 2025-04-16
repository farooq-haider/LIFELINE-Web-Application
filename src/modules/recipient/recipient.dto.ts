import { z } from "zod";

export const CreateRecipientDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
});

export const LoginRecipientDTOSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),
  password: z.string(),
});

export const RecipientResponseDTOSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateRecipientDTO = z.infer<typeof CreateRecipientDTOSchema>;
export type RecipientResponseDTO = z.infer<typeof RecipientResponseDTOSchema>;
export type LoginRecipientDTO = z.infer<typeof LoginRecipientDTOSchema>;
