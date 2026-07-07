"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {
  order: any;
  role: string;
  currentUserId: string;
};

export default function OrderActions({
  order,
  role,
  currentUserId,
}: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isAdmin = role === "admin";

  const isOwner =
    (order.user?._id || order.user)?.toString() ===
    currentUserId;

  const canCancel =
    isOwner && order.status === "pending";

  async function handleDelete() {
    if (!confirm("Видалити замовлення?")) return;

    setLoading(true);

    const res = await fetch(
      `/api/orders/${order._id}`,
      {
        method: "DELETE",
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));

      setError(
        data.error || "Помилка видалення"
      );

      return;
    }

    router.push("/dashboard/orders");
    router.refresh();
  }

  async function handleCancel() {
    if (!confirm("Скасувати замовлення?"))
      return;

    setLoading(true);

    const res = await fetch(
      `/api/orders/${order._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: "cancelled",
        }),
      }
    );

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));

      setError(
        data.error || "Помилка"
      );

      return;
    }

    router.refresh();
  }

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-3 text-red-600">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        {isAdmin && (
          <>
            <Link
              href={`/dashboard/orders/${order._id}/edit`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Редагувати
            </Link>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Видалити
            </button>
          </>
        )}

        {!isAdmin && canCancel && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Скасувати
          </button>
        )}
      </div>
    </div>
  );
}