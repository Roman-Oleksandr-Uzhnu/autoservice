"use client";

import { useEffect, useMemo, useState } from "react";
import ServiceCard from "./ServiceCard";

type Service = {
  _id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  available: boolean;
};

export default function MenuFilter() {
  const [services, setServices] = useState<Service[]>([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error();
        setServices(await response.json());
      } catch {
        setError("Не вдалося завантажити послуги");
      }
    }

    void loadServices();
  }, []);

  const categories = useMemo(
    () => ["Всі", ...new Set(services.map((service) => service.category))],
    [services]
  );

  const filteredItems = services.filter((service) => {
    const matchesSearch = service.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "Всі" ||
      service.category === activeCategory;

    const matchesAvailability =
      !showAvailableOnly || service.available;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability
    );
  });

  return (
    <div>
      {error && (
        <p className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}
      {/* Пошук */}
      <input
        type="text"
        placeholder="Пошук послуги..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 border rounded-lg mb-6 text-gray-900"
      />

      {/* Категорії */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              activeCategory === category
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Чекбокс */}
      <label className="flex items-center gap-2 mb-6 cursor-pointer text-gray-700">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) =>
            setShowAvailableOnly(e.target.checked)
          }
        />

        Лише доступні послуги
      </label>

      {/* Кількість */}
      <p className="text-gray-600 mb-6">
        Знайдено: {filteredItems.length} з {services.length}
      </p>

      {/* Картки */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((service) => (
            <ServiceCard
              key={service._id}
              {...service}
              id={service._id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500 text-xl">
          Послуг не знайдено
        </div>
      )}
    </div>
  );
}
