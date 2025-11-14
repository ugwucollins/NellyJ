import z from "zod";
import { PasswordRegexM as ResetPasswordRegexM, Regex } from "./RegisterSchema";

export const NameRegex = /^[a-z0-9]{4,30}$/i;

export const MinPassword = "Password must be more that 8 characters";

export const EmailM = "Enter a valid Email Address";
export const PasswordRegexM =
  "Password must contain 1 Upper Case, 1 Lower Case, 1 Special Char, and at least 1 Number";

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
    imageUrl: z.string().trim().optional(),
    phoneNumber: z.string().min(10).or(z.number().min(10)),
    gender: z.enum(["male", "female", "others"]),
  })
  .strict();

export const ProfileSchema = z
  .object({
    firstName: z.string().trim().min(3),
    lastName: z
      .string()
      .trim()
      .min(3)
      .regex(NameRegex, "LastName must be one word without any space"),
    email: z.string().email().trim(),
    imageUrl: z.string().trim().optional(),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    gender: z.enum(["male", "female", "others"]),
  })
  .strict();

export const CardSchema = z
  .object({
    name: z.string().trim().min(3),
    cvv: z.string().min(3).max(3).or(z.number().min(3).max(3)),
    number: z.string().min(18).max(18).or(z.number().min(18).max(18)),
    save: z.boolean(),
    expireDate: z.string().min(4),
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
    nearestBusTop: z.string().min(5),
  })
  .strict();

const descriptionM = "description must be more that 50 characters";

export const EventSchema = z
  .object({
    name: z.string().trim().min(4),
    event: z
      .string()
      .trim()
      .min(4, "Enter the name of Event or ceremony you are doing"),
    country: z.string().trim().min(4),
    state: z.string().trim().min(3),
    town: z.string().trim().min(4),
    busTop: z.string().trim().min(4),
    email: z.string().email().trim(),
    people: z
      .string()
      .min(2, "Select the Number of persons you want")
      .nonempty()
      .or(z.number().min(2, "Select the Number of persons you want")),
    phoneNumber: z.string().min(10).max(12).or(z.number().min(10).max(12)),
    address: z.string().min(5),
    foods: z.array(z.string()),
    description: z.string().min(50, descriptionM),
    date: z.string().min(4).optional(),
  })
  .strict();

export const NewsLetterSchema = z
  .object({
    email: z.string().trim().email(),
  })
  .strict();

export const PassWordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!.%*?&_])[A-Za-z\d$@$!%*.?&_]{8,30}$/;

export const PasswordUpdateSchema = z
  .object({
    password: z.string().trim().min(8, MinPassword),
    newPassword: z
      .string()
      .trim()
      .min(8, MinPassword)
      .regex(PassWordRegex, PasswordRegexM),
    confirmPassword: z
      .string()
      .trim()
      .min(8, MinPassword)
      .regex(PassWordRegex, PasswordRegexM),
  })
  .strict();

export const PasswordResetSchema = z
  .object({
    password: z.string().min(8, MinPassword).regex(Regex, ResetPasswordRegexM),
    confirmPassword: z
      .string()
      .min(8, MinPassword)
      .regex(Regex, ResetPasswordRegexM),
  })
  .strict();

export const TrackOrderSchema = z.object({
  orderID: z.string().min(5, "please enter a valid OrderID").trim(),
  email: z.string().email(),
});

export const ProductSchema = z.object({
  name: z.string().min(5).trim(),
  description: z.string().or(z.array(z.string())),
  category: z.string().min(5, "Please Select the category").trim(),
  deliveryFee: z
    .number()
    .min(2, "Please enter the amount")
    .or(z.string().min(2, "Please enter the amount")),
  price: z
    .number()
    .min(2, "Please enter the amount")
    .or(z.string().min(2, "Please enter the amount")),
  offerPrice: z
    .number()
    .min(2, "Please enter the amount")
    .or(z.string().min(2, "Please enter the amount")),
});
