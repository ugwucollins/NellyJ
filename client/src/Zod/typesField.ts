import { z } from "zod";
import type { LoginSchema } from "./Schema/LoginSchema";
import type { RegisterSchema } from "./Schema/RegisterSchema";
export type LoginField = z.infer<typeof LoginSchema>;
export type RegisterField = z.infer<typeof RegisterSchema>;
