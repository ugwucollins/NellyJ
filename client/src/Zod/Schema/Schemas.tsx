import z from "zod";

export const ContactSchema = z
  .object({
    name: z.string().min(4),
    email: z.string().email(),
    phoneNumber: z.string().min(10).or(z.number().min(10)).optional(),
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
