import z from "zod";
import { MinPassword } from "./Schemas";

export const RegisterSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z.string().trim().min(3),
    email: z.string().email().trim(),
    password: z.string().min(8, MinPassword).trim(),
  })
  .strict();
