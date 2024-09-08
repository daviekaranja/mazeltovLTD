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
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().int().min(0, "Stock must be a non-negative integer"),
  active: z.boolean(),
});

// Add other schemas as needed...
