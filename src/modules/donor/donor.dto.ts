import { z } from "zod";

export enum BloodGroup {
  A_POSITIVE = "A+",
  A_NEGATIVE = "A-",
  B_POSITIVE = "B+",
  B_NEGATIVE = "B-",
  AB_POSITIVE = "AB+",
  AB_NEGATIVE = "AB-",
  O_POSITIVE = "O+",
  O_NEGATIVE = "O-",
}

export const CreateDonorDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  bloodGroup: z.nativeEnum(BloodGroup),
  lastDonation: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  isActive: z.boolean().default(true),
  verified: z.boolean().default(false),
});

export const UpdateDonorDTOSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  bloodGroup: z.nativeEnum(BloodGroup).optional(),
  lastDonation: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  isActive: z.boolean().optional(),
  verified: z.boolean().optional(),
});

export const DonorResetPasswordDTOSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const DonorResponseDTOSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  bloodGroup: z.nativeEnum(BloodGroup),
  lastDonation: z.string(),
  phone: z.string(),
  address: z.string(),
  city: z.string(),
  isActive: z.boolean(),
  verified: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const LoginDonorDTOSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .transform((val) => val.toLowerCase()),
  password: z.string(),
});

export type CreateDonorDTO = z.infer<typeof CreateDonorDTOSchema>;
export type DonorResponseDTO = z.infer<typeof DonorResponseDTOSchema>;
export type LoginDonorDTO = z.infer<typeof LoginDonorDTOSchema>;
export type UpdateDonorDTO = z.infer<typeof UpdateDonorDTOSchema>;
export type DonorResetPasswordDTO = z.infer<typeof DonorResetPasswordDTOSchema>;
