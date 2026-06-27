import Link from "next/link";
import { services } from "@/lib/services";

export default function ServicesPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Послуги
        </h1>

        <Link
          href="/dashboard/services/new"
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
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
                key={service.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4 flex items-center gap-3">
                  <span className="text-2xl">
                    {service.icon}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {service.name}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {service.category}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {service.price} грн
                </td>

                <td className="px-6 py-4">
                  {service.available ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                      Доступно
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                      Недоступно
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <Link
                    href={`/dashboard/services/${service.id}`}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Переглянути
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}