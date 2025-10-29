import z from "zod";

export const ContactSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    subject: z.string().min(5).max(300),
    message: z.string().min(50),
  })
  .strict();

export const CompleteProfileSchema = z
  .object({
    email: z.string().email().trim(),
    imageUrl: z.string().trim().optional(),
    phoneNumber: z.string().min(10).or(z.number().min(10)),
    gender: z.enum(["male", "female", "others"]),
  })
  .strict();

export const ProfileSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z.string().trim().min(3),
    email: z.string().email().trim(),
    imageUrl: z.string().trim().optional(),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    gender: z.enum(["male", "female", "others"]),
  })
  .strict();

export const AddressSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z.string().trim().min(3),
    title: z.string().trim().min(3),
    country: z.string().trim().min(4),
    state: z.string().trim().min(3),
    city: z.string().trim().min(3),
    email: z.string().email().trim(),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    address: z.string().min(5),
  })
  .strict();

export const NewsLetterSchema = z.object({
  email: z.string().trim().email(),
});
