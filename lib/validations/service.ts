import { z } from "zod";

export const createServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Назва послуги обов'язкова")
    .max(100, "Максимум 100 символів")
    .trim(),

  description: z
    .string()
    .max(500, "Максимум 500 символів")
    .trim()
    .optional()
    .default(""),

  price: z
    .number()
    .min(0, "Ціна не може бути від'ємною"),

  icon: z
    .string()
    .max(10)
    .optional()
    .default("🔧"),

  category: z
    .string()
    .min(1, "Категорія обов'язкова")
    .max(50, "Максимум 50 символів")
    .trim(),

  available: z
    .boolean()
    .optional()
    .default(true),
});

export const updateServiceSchema = createServiceSchema.partial();