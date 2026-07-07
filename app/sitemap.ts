

import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default async function sitemap() {
  const staticRoutes = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  let dynamicRoutes: { url: string; lastModified: Date; changeFrequency: string; priority: number }[] = [];

  try {
    await dbConnect();

    const services = await Service.find({ available: true })
      .select("_id updatedAt")
      .lean();

    dynamicRoutes = services.map((service: any) => ({
      url: `${siteUrl}/menu/${service._id}`,
      lastModified: service.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Якщо база недоступна під час білду — повертаємо тільки статичні маршрути.
  }

  return [...staticRoutes, ...dynamicRoutes];
}