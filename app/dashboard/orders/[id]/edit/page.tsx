"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();

  const [status, setStatus] = useState("pending");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status || "pending");
        setNotes(data.notes || "");
        setLoading(false);
      });
  }, [params.id]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const res = await fetch(
      `/api/orders/${params.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes,
        }),
      }
    );

    if (res.ok) {
      router.push("/dashboard/orders");
      router.refresh();
    } else {
      alert("Помилка оновлення");
    }
  }

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10">
      <Link
        href="/dashboard/orders"
        className="text-red-600 hover:underline"
      >
        ← Назад
      </Link>

      <h1 className="text-3xl font-bold my-6">
        Редагування замовлення
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-lg shadow"
      >
        <div>
          <label className="block mb-2 font-semibold">
            Статус
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded p-3"
          >
            <option value="pending">
              Очікує
            </option>

            <option value="preparing">
              В роботі
            </option>

            <option value="ready">
              Готово
            </option>

            <option value="completed">
              Виконано
            </option>

            <option value="cancelled">
              Скасовано
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-semibold">
            Коментар
          </label>

          <textarea
            rows={4}
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            className="w-full border rounded p-3"
          />
        </div>

        <button
          className="bg-red-600 text-white px-6 py-3 rounded"
        >
          Зберегти
        </button>
      </form>
    </div>
  );
}