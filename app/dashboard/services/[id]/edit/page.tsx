"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    icon: "🔧",
    available: true,
  });

  useEffect(() => {
    async function loadService() {
      try {
        const res = await fetch(`/api/services/${id}`);

        if (!res.ok) {
          throw new Error("Не вдалося завантажити послугу");
        }

        const data = await res.json();

        setFormData({
          name: data.name || "",
          category: data.category || "",
          price: String(data.price || ""),
          description: data.description || "",
          icon: data.icon || "🔧",
          available: data.available,
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Помилка оновлення");
      }

      router.push(`/dashboard/services/${id}`);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center py-10">
        Завантаження...
      </div>
    );
  }

  return (
    <div>
      <Link
        href={`/dashboard/services/${id}`}
        className="text-red-600 hover:underline"
      >
        ← Назад
      </Link>

      <div className="bg-white rounded-xl shadow p-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Редагувати послугу
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Назва
            </label>

            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Категорія
            </label>

            <input
              type="text"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Ціна
            </label>

            <input
              type="number"
              name="price"
              required
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-900">
              Опис
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3 text-gray-900"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
              {saving ? "Збереження..." : "Зберегти"}
            </button>

            <Link
              href={`/dashboard/services/${id}`}
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