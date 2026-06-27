import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceById } from "@/lib/services";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ServiceDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const service = getServiceById(id);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/dashboard/services"
        className="text-red-600 hover:underline mb-6 inline-block"
      >
        ← Назад до списку
      </Link>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{service.icon}</span>

            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {service.name}
              </h1>

              <p className="text-gray-500">
                {service.category}
              </p>
            </div>
          </div>

          <div className="bg-yellow-200 px-4 py-2 rounded">
            TEST
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-gray-500 mb-2">
              Ціна
            </h3>

            <p className="text-3xl font-bold text-red-600">
              {service.price} грн
            </p>
          </div>

          <div>
            <h3 className="font-bold text-gray-500 mb-2">
              Статус
            </h3>

            <p
              className={
                service.available
                  ? "text-green-600 font-semibold"
                  : "text-red-600 font-semibold"
              }
            >
              {service.available
                ? "Доступно"
                : "Недоступно"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-bold text-gray-500 mb-3">
            Опис
          </h3>

          <p className="text-gray-700 leading-7">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}