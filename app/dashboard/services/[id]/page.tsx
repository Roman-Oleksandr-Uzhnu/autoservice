"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await fetch(`/api/services/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Послугу не знайдено");
          }

          throw new Error("Помилка завантаження");
        }

        const data = await response.json();
        setService(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-400 mb-4">
          404
        </h1>

        <p className="mb-4">{error}</p>

        <Link
          href="/dashboard/services"
          className="text-red-600 hover:underline"
        >
          ← До списку послуг
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <Link
          href="/dashboard/services"
          className="text-red-600 hover:underline"
        >
          ← Назад
        </Link>

        <Link
          href={`/dashboard/services/${id}/edit`}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Редагувати
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{service.icon}</span>

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {service.name}
            </h1>

            <p className="text-gray-500">
              {service.category}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <p className="text-gray-500">Ціна</p>

            <p className="text-2xl font-bold text-gray-900">
              {service.price} грн
            </p>
          </div>

          <div>
            <p className="text-gray-500">Статус</p>

            {service.available ? (
              <span className="text-green-600 font-semibold">
                Доступно
              </span>
            ) : (
              <span className="text-red-600 font-semibold">
                Недоступно
              </span>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-xl mb-2 text-gray-900">
            Опис
          </h2>

          <p className="text-gray-700">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}