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
