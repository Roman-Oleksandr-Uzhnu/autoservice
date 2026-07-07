"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

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

  const [loading, setLoading] =
    useState(false);

  const isAdmin = role === "admin";

  const isOwner =
    (order.user?._id || order.user)?.toString() ===
    currentUserId;

  const canCancel =
    isOwner &&
    order.status === "pending";

  async function handleDelete() {
    if (!confirm("Видалити замовлення?"))
      return;

    setLoading(true);

    try {
      const res = await fetch(
        `/api/orders/${order._id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({}));

        toast.error(
          data.error ||
            "Помилка видалення"
        );

        return;
      }

      toast.success(
        "Замовлення видалено"
      );

      router.push("/dashboard/orders");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel() {
    if (!confirm("Скасувати замовлення?"))
      return;

    setLoading(true);

    try {
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

      if (!res.ok) {
        const data = await res
          .json()
          .catch(() => ({}));

        toast.error(
          data.error || "Помилка"
        );

        return;
      }

      toast.success(
        "Замовлення скасовано"
      );

      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
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
              className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {loading
                ? "..."
                : "Видалити"}
            </button>
          </>
        )}

        {!isAdmin && canCancel && (
          <button
            onClick={handleCancel}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading
              ? "..."
              : "Скасувати"}
          </button>
        )}
      </div>
    </div>
  );
}