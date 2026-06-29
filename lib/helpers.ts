import { services } from "./services";

export function getServiceStats() {
  const total = services.length;

  const available = services.filter(
    (service) => service.available
  ).length;

  const unavailable = total - available;

  const categories = [
    ...new Set(
      services.map((service) => service.category)
    ),
  ];

  const avgPrice = Math.round(
    services.reduce(
      (sum, service) => sum + service.price,
      0
    ) / total
  );

  return {
    total,
    available,
    unavailable,
    categoriesCount: categories.length,
    avgPrice,
  };
}