'use client'

import { useState } from "react";
import ServiceCard from "./ServiceCard";

const menuItems = [
  {
    id: 1,
    name: "Комп'ютерна діагностика",
    description: "Повна перевірка автомобіля.",
    price: 1200,
    icon: "🔧",
    category: "Діагностика",
    available: true,
  },
  {
    id: 2,
    name: "Заміна масла",
    description: "Заміна масла та всіх фільтрів.",
    price: 900,
    icon: "🛢️",
    category: "ТО",
    available: true,
  },
  {
    id: 3,
    name: "Ремонт двигуна",
    description: "Ремонт будь-якої складності.",
    price: 6500,
    icon: "⚙️",
    category: "Ремонт",
    available: true,
  },
  {
    id: 4,
    name: "Ходова частина",
    description: "Діагностика та ремонт підвіски.",
    price: 2500,
    icon: "🚗",
    category: "Ремонт",
    available: true,
  },
  {
    id: 5,
    name: "Шиномонтаж",
    description: "Балансування та заміна шин.",
    price: 700,
    icon: "🛞",
    category: "Шини",
    available: false,
  },
  {
    id: 6,
    name: "Автоелектрика",
    description: "Ремонт електрики автомобіля.",
    price: 1800,
    icon: "⚡",
    category: "Електрика",
    available: true,
  },
  {
    id: 7,
    name: "Заміна гальм",
    description: "Диски та колодки.",
    price: 2300,
    icon: "🛑",
    category: "ТО",
    available: true,
  },
  {
    id: 8,
    name: "Заправка кондиціонера",
    description: "Повне обслуговування кондиціонера.",
    price: 1500,
    icon: "❄️",
    category: "Діагностика",
    available: false,
  },
];

const categories = ["Всі", ...new Set(menuItems.map((item) => item.category))];

export default function MenuFilter() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Всі");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      activeCategory === "Всі" || item.category === activeCategory;

    const matchesAvailability =
      !showAvailableOnly || item.available;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesAvailability
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Пошук послуги..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border rounded-lg p-3 mb-6 text-gray-900 placeholder-gray-500 bg-white"
      />

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
      <label className="flex items-center gap-2 mb-6 cursor-pointer text-gray-800 font-medium">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => setShowAvailableOnly(e.target.checked)}
        />
        Лише доступні послуги
      </label>

      <p className="text-gray-500 mb-6">
        Знайдено: {filteredItems.length} з {menuItems.length}
      </p>

      {filteredItems.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <ServiceCard
              key={item.id}
              {...item}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-700 font-medium mb-6">
          Нічого не знайдено
        </p>
      )}
    </div>
  );
}