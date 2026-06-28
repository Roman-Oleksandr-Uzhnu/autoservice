"use client";

import { useState } from "react";
import Link from "next/link";

export default function ServiceForm({
  initialData,
  onSubmit,
  submitLabel = "Зберегти",
  isSubmitting,
  error,
}: any) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || "",
    description: initialData?.description || "",
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

    onSubmit({
      ...formData,
      price: Number(formData.price),
    });
  }

  return (
    <>
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-semibold">
            Назва
          </label>

          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Категорія
          </label>

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
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
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Опис
          </label>

          <textarea
            rows={4}
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <button
          disabled={isSubmitting}
          className="bg-red-600 text-white px-6 py-3 rounded-lg"
        >
          {isSubmitting ? "Збереження..." : submitLabel}
        </button>

        <Link
          href="/dashboard/services"
          className="ml-4 bg-gray-300 px-6 py-3 rounded-lg inline-block"
        >
          Скасувати
        </Link>
      </form>
    </>
  );
}