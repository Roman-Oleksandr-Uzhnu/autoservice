/**
 * Видаляє HTML-теги з рядка
 */
export function stripHtml(str: string) {
  if (typeof str !== "string") return str;

  return str.replace(/<[^>]*>/g, "").trim();
}

/**
 * Санітизує всі рядкові поля об'єкта
 */
export function sanitizeObject(
  obj: Record<string, any>
) {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    sanitized[key] =
      typeof value === "string"
        ? stripHtml(value)
        : value;
  }

  return sanitized;
}