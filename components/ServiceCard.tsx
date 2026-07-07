"use client";

import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
import { useCart } from "@/lib/context/CartContext";

type ServiceCardProps = {
  id: string | number;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  available?: boolean;
};

export default function ServiceCard({
  id,
  name,
  description,
  price,
  icon,
  category,
  available = true,
}: ServiceCardProps) {
  const { addItem } = useCart();

  function handleAddToCart() {
    addItem({
      service: String(id),
      name,
      price,
      quantity: 1,
    });

    alert("Послугу додано до кошика!");
  }

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ${
        !available ? "opacity-60" : ""
      }`}
    >
      <div className="h-36 bg-slate-100 flex items-center justify-center">
        <span className="text-6xl">{icon}</span>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            {name}
          </h3>

          <div className="flex items-center gap-2">
            <FavoriteButton serviceId={String(id)} />

            {available ? (
              <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
                Доступно
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
                Недоступно
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center mb-4">
          <span className="text-red-600 font-bold text-lg">
            {price} грн
          </span>

          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!available}
            className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white py-2 rounded-lg transition"
          >
            Додати в кошик
          </button>

          <Link
            href={`/menu/${id}`}
            className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            Детальніше
          </Link>
        </div>
      </div>
    </div>
  );
}
