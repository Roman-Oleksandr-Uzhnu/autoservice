"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchServices() {
    try {
      setLoading(true);

      const response = await fetch("/api/services");

      if (!response.ok) {
        throw new Error("Помилка завантаження");
      }

      const data = await response.json();
setServices(data.services);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleDelete(id: number) {
    if (!confirm("Видалити послугу?")) return;

    await fetch(`/api/services/${id}`, {
      method: "DELETE",
    });

    fetchServices();
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        Завантаження...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 py-10">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Послуги ({services.length})
        </h1>

        <Link
          href="/dashboard/services/new"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
        >
          + Додати послугу
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">Послуга</th>
              <th className="px-6 py-4 text-left">Категорія</th>
              <th className="px-6 py-4 text-left">Ціна</th>
              <th className="px-6 py-4 text-left">Статус</th>
              <th className="px-6 py-4 text-left">Дії</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service) => (
              <tr
                key={service._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {service.icon} {service.name}
                </td>

                <td className="px-6 py-4">
                  {service.category}
                </td>

                <td className="px-6 py-4">
                  {service.price} грн
                </td>

                <td className="px-6 py-4">
                  {service.available ? "Доступно" : "Недоступно"}
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <Link
                    href={`/dashboard/services/${service._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Переглянути
                  </Link>

                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-600 hover:underline"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}