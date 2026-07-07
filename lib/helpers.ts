import dbConnect from "./db";
import Service from "./models/Service";
import Order from "./models/Order";

export async function getServiceStats() {
  await dbConnect();

  const [total, available, services] = await Promise.all([
    Service.countDocuments({}),
    Service.countDocuments({ available: true }),
    Service.find({}),
  ]);

  const unavailable = total - available;

  const categories = [
    ...new Set(services.map((service) => service.category)),
  ];

  const avgPrice =
    total === 0
      ? 0
      : Math.round(
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

export async function getOrderStats() {
  await dbConnect();

  const [total, pending, completed] =
    await Promise.all([
      Order.countDocuments({}),
      Order.countDocuments({
        status: "pending",
      }),
      Order.countDocuments({
        status: "completed",
      }),
    ]);

  return {
    total,
    pending,
    completed,
  };
}