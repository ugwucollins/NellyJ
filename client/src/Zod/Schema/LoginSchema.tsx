import { z } from "zod";
import { MinPassword } from "./Schemas";

export const LoginSchema = z
  .object({
    email: z.string().email().trim(),
    password: z.string().min(8, MinPassword).trim(),
  })
  .strict();
