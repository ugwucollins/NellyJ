import z from "zod";

export const MinPassword = "Password must be more that 8 characters";

export const PasswordRegexM =
  "Password must contain 1 Lower Case, 1 Special Char, and at least 1 Number";

export const Regex =
  /^(?=.*[a-z])(?=.*\d)(?=.*[$@$!.%*?&_])[A-Za-z\d$@$!%*.?&_]{8,30}$/;

export const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z.string().trim().min(3),
    email: z.string().email().trim(),
    password: z.string().min(8, MinPassword).regex(Regex, PasswordRegexM),
  })
  .strict();
export const RegisterSellerSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z.string().trim().min(3),
    email: z.string().email().trim(),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    password: z.string().min(8, MinPassword).regex(Regex, PasswordRegexM),
  })
  .strict();
export const RegisterChiefSchema = z
  .object({
    name: z.string().trim().min(5, "please enter your fullname"),

    role: z.enum(["CEO", "manager", "caterer", "worker", "seller", "chief"]),
    email: z.string().email().trim(),
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    whatsapp: z.string().optional(),
  })
  .strict();
