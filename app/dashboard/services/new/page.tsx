"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewServicePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log(formData);

    router.push("/dashboard/services");
  }

  return (
    <div>
      <Link
        href="/dashboard/services"
        className="text-red-600 hover:underline inline-block mb-6"
      >
        ← Назад
      </Link>

      <div className="bg-white rounded-xl shadow p-8">

        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Додати послугу
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block mb-2 font-semibold">
              Назва
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Категорія
            </label>

            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Ціна
            </label>

            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">
              Опис
            </label>

            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Створити
            </button>

            <Link
              href="/dashboard/services"
              className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400"
            >
              Скасувати
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}