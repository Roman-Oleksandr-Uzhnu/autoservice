import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Мінімум 2 символи")
    .max(50, "Максимум 50 символів")
    .trim(),

  email: z
    .string()
    .email("Некоректний формат email")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(6, "Мінімум 6 символів")
    .max(100, "Максимум 100 символів"),
});

export const updateRoleSchema = z.object({
  role: z.enum(["user", "admin"]),
});