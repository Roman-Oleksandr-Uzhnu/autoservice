import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[a-fA-F0-9]{24}$/, "Невірний ID");

const orderItemSchema = z.object({
  service: objectIdSchema,

  quantity: z
    .number()
    .int("Кількість повинна бути цілим числом")
    .min(1, "Мінімум 1")
    .max(20, "Максимум 20"),
});

export const createOrderSchema = z.object({
  user: objectIdSchema.optional(),

  items: z
    .array(orderItemSchema)
    .min(1, "Замовлення повинно містити хоча б одну послугу")
    .max(20, "Максимум 20 позицій"),

  notes: z
    .string()
    .max(300, "Максимум 300 символів")
    .trim()
    .optional()
    .default(""),
});

export const updateOrderSchema = z
  .object({
    status: z
      .enum([
        "pending",
        "preparing",
        "ready",
        "completed",
        "cancelled",
      ])
      .optional(),

    notes: z
      .string()
      .max(300, "Максимум 300 символів")
      .trim()
      .optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Немає даних для оновлення",
  });

export const userUpdateOrderSchema = z.object({
  status: z.literal("cancelled"),
});
