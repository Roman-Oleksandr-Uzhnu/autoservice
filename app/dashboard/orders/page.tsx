"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import OrderStatusBadge from "@/components/OrderStatusBadge";

type Order = {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  user?: {
    name: string;
    email: string;
  };
  items?: {
    quantity: number;
    service?: {
      name: string;
    };
  }[];
};

export default function OrdersPage() {
  const { data: session } = useSession();

  const role = session?.user?.role;

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {role === "admin"
            ? "Усі замовлення"
            : "Мої замовлення"}
        </h1>

        <Link
          href="/dashboard/orders/new"
          className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
        >
          + Нове замовлення
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          Замовлень поки немає.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-lg shadow p-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold">
                    Замовлення №
                    {order._id.slice(-6)}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleString("uk-UA")}
                  </p>

                  {role === "admin" &&
                    order.user && (
                      <p className="text-sm mt-2">
                        {order.user.name}
                      </p>
                    )}

                  <p className="font-semibold mt-2">
                    {order.totalPrice} грн
                  </p>
                </div>

                <div className="text-right">
                  <OrderStatusBadge
                    status={order.status}
                  />

                  <div className="mt-4">
                    <Link
                      href={`/dashboard/orders/${order._id}`}
                      className="text-red-600 hover:underline"
                    >
                      Детальніше
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}