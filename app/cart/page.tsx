"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useCart } from "@/lib/context/CartContext";

export default function CartPage() {
  const { items, clearCart } = useCart();
  const { status } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  async function createOrder() {
    if (items.length === 0) {
      alert("Кошик порожній");
      return;
    }

    if (status !== "authenticated") {
      router.push("/auth/login?callbackUrl=/cart");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            service: item.service,
            quantity: item.quantity,
          })),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        const message = data?.error ?? data?.errors?.join(", ");
        alert(message || "Помилка створення замовлення");
        return;
      }

      clearCart();
      alert("Замовлення успішно створено!");
    } catch {
      alert("Не вдалося зв'язатися із сервером");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">
        Кошик
      </h1>

      {items.length === 0 ? (
        <p>Кошик порожній</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.service}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div>
                  <h2 className="font-semibold">
                    {item.name}
                  </h2>

                  <p>
                    {item.quantity} × {item.price} грн
                  </p>
                </div>

                <div className="font-bold">
                  {item.price * item.quantity} грн
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              Разом: {total} грн
            </h2>

            <button
              onClick={createOrder}
              disabled={isSubmitting || status === "loading"}
              className="bg-red-600 disabled:bg-gray-400 text-white px-6 py-3 rounded"
            >
              {isSubmitting ? "Оформлення…" : "Оформити замовлення"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
