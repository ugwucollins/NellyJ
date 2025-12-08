import { z } from "zod";
import type { LoginSchema } from "./Schema/LoginSchema";
import type {
  RegisterSchema,
  RegisterSellerSchema,
} from "./Schema/RegisterSchema";
import type {
  CompleteProfileSchema,
  ContactSchema,
  NewsLetterSchema,
  AddressSchema,
  ProfileSchema,
  CardSchema,
  PasswordUpdateSchema,
  EventSchema,
  TrackOrderSchema,
  ProductSchema,
  PasswordResetSchema,
} from "./Schema/Schemas";
export type LoginField = z.infer<typeof LoginSchema>;
export type RegisterField = z.infer<typeof RegisterSchema>;
export type RegisterSellersField = z.infer<typeof RegisterSellerSchema>;
export type ContactField = z.infer<typeof ContactSchema>;
export type CompleteProfileField = z.infer<typeof CompleteProfileSchema>;
export type ProfileField = z.infer<typeof ProfileSchema>;

export type NewsLetterField = z.infer<typeof NewsLetterSchema>;
export type AddressField = z.infer<typeof AddressSchema>;
export type CardField = z.infer<typeof CardSchema>;
export type PasswordResetField = z.infer<typeof PasswordResetSchema>;
export type PasswordUpdateField = z.infer<typeof PasswordUpdateSchema>;
export type EventField = z.infer<typeof EventSchema>;
export type TrackOrderField = z.infer<typeof TrackOrderSchema>;
export type ProductField = z.infer<typeof ProductSchema>;
