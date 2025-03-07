import { z } from 'zod';

export enum BloodGroup {
    A_POSITIVE = 'A+',
    A_NEGATIVE = 'A-',
    B_POSITIVE = 'B+',
    B_NEGATIVE = 'B-',
    AB_POSITIVE = 'AB+',
    AB_NEGATIVE = 'AB-',
    O_POSITIVE = 'O+',
    O_NEGATIVE = 'O-',
}

export const CreateDonorDTOSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    bloodGroup: z.nativeEnum(BloodGroup),
    lastDonation: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    isActive: z.boolean().default(true),
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
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const LoginDonorDTOSchema = z.object({
    email: z.string().email('Invalid email address').transform((val) => val.toLowerCase()),
    password: z.string()
});

export type CreateDonorDTO = z.infer<typeof CreateDonorDTOSchema>;
export type DonorResponseDTO = z.infer<typeof DonorResponseDTOSchema>;
export type LoginDonorDTO = z.infer<typeof LoginDonorDTOSchema>;