import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обов'язковий")
    .email("Некоректний email")
    .toLowerCase()
    .trim(),

  password: z
    .string()
    .min(1, "Пароль обов'язковий"),
});

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, "Мінімум 2 символи")
      .max(50, "Максимум 50")
      .trim(),

    email: z
      .string()
      .min(1, "Email обов'язковий")
      .email("Некоректний email")
      .toLowerCase()
      .trim(),

    password: z
      .string()
      .min(6, "Мінімум 6 символів")
      .max(100, "Максимум 100"),

    confirmPassword: z
      .string()
      .min(6, "Мінімум 6 символів"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Паролі не збігаються",
    path: ["confirmPassword"],
  });