import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

export async function getServiceStats() {
  await dbConnect();

  const services = await Service.find();

  const total = services.length;
  const available = services.filter((s) => s.available).length;
  const unavailable = total - available;
  const categories = [...new Set(services.map((s) => s.category))];

  const avgPrice =
    total > 0
      ? Math.round(
          services.reduce((sum, s) => sum + s.price, 0) / total
        )
      : 0;

  return {
    total,
    available,
    unavailable,
    categoriesCount: categories.length,
    avgPrice,
  };
}