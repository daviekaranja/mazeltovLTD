import { z } from "zod";

// User Schema
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password Should be atleast 8 characters"),
});

// Product Schema
export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  category: z.string(),
  price: z.number(),
  phone_number: z.string(),
  image_url: z.string(),
  description: z.string(),
});

export const PayBillPush = z.object({
  stkNumber: z
    .string()
    .regex(
      /^2547\d{8}$|^2541\d{8}$/,
      "stkNumber must be in the format 2547xx xxx xxx or 2541xx xxx xxx"
    )
    .max(12),

  amount: z
    .number()
    .min(1, "Amount must be at least 5")
    .max(10000, "Amount must not exceed 10000"),

  // rechargeNumber: z
  //   .string()
  //   .regex(
  //     /^07\d{8}$|^01\d{8}$/,
  //     "rechargeNumber must be in the format 07xx xxx xxx or 01xx xxx xxx"
  //   )
  //   .max(12),
});
