import Link from "next/link";
import { notFound } from "next/navigation";
import mongoose from "mongoose";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

type ServiceDetails = {
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  available: boolean;
};

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const service = await getService(id);

  if (!service) {
    return {
      title: "Послугу не знайдено",
    };
  }

  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServicePage({
  params,
}: PageProps) {
  const { id } = await params;

  const service = await getService(id);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <section className="bg-gradient-to-r from-slate-900 to-red-700 text-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6">

          <Link
            href="/menu"
            className="text-red-200 hover:text-white"
          >
            ← Назад до послуг
          </Link>

          <div className="mt-8 flex items-center gap-6">

            <span className="text-7xl">
              {service.icon}
            </span>

            <div>
              <h1 className="text-5xl font-bold">
                {service.name}
              </h1>

              <p className="text-red-200 mt-2">
                {service.category}
              </p>
            </div>

          </div>

        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-white rounded-2xl shadow-lg p-10">

            <div className="grid md:grid-cols-2 gap-8 mb-10">

              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-2">
                  Ціна
                </h3>

                <p className="text-3xl font-bold text-red-600">
                  {service.price} грн
                </p>
              </div>

              <div>
                <h3 className="text-gray-500 text-sm font-bold mb-2">
                  Статус
                </h3>

                {service.available ? (
                  <span className="text-green-600 font-semibold">
                    Доступно
                  </span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Тимчасово недоступно
                  </span>
                )}
              </div>

            </div>

            <div>

              <h3 className="text-gray-500 text-sm font-bold mb-3">
                Опис послуги
              </h3>

              <p className="text-gray-700 leading-8">
                {service.description}
              </p>

            </div>

          </div>

        </div>
      </section>
    </div>
  );
}

async function getService(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  await dbConnect();
  return Service.findById(id).lean().exec() as Promise<ServiceDetails | null>;
}
