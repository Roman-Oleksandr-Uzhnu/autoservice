"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Service = {
  _id: string;
  name: string;
  price: number;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type OrderItem = {
  service: string;
  quantity: number;
};

type Props = {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  error?: string;
};

const emptyItem = (): OrderItem => ({
  service: "",
  quantity: 1,
});

export default function OrderForm({
  onSubmit,
  isSubmitting,
  error,
}: Props) {
  const { data: session } = useSession();

  const isAdmin = session?.user?.role === "admin";

  const [services, setServices] = useState<Service[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");

  const [items, setItems] = useState<OrderItem[]>([
    emptyItem(),
  ]);

  const [notes, setNotes] = useState("");

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(Array.isArray(data) ? data : []);
      });
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(Array.isArray(data) ? data : []);
      });
  }, [isAdmin]);

  const servicesMap = useMemo(() => {
    const map = new Map<string, Service>();

    services.forEach((service) =>
      map.set(service._id, service)
    );

    return map;
  }, [services]);
  const totalPrice = useMemo(() => {
  return items.reduce((sum, item) => {
    const service = servicesMap.get(item.service);

    if (!service) return sum;

    return sum + service.price * item.quantity;
  }, 0);
}, [items, servicesMap]);

function updateItem(
  index: number,
  patch: Partial<OrderItem>
) {
  setItems((prev) =>
    prev.map((item, i) =>
      i === index
        ? { ...item, ...patch }
        : item
    )
  );
}

function addItem() {
  setItems((prev) => [
    ...prev,
    emptyItem(),
  ]);
}

function removeItem(index: number) {
  setItems((prev) =>
    prev.length === 1
      ? prev
      : prev.filter((_, i) => i !== index)
  );
}

const canSubmit =
  items.length > 0 &&
  items.every(
    (item) =>
      item.service &&
      item.quantity >= 1
  );

function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  const payload: any = {
    items,
    notes,
  };

  if (isAdmin && userId) {
    payload.user = userId;
  }

  onSubmit(payload);
  }
  return (
    <>
      {error && (
        <div className="mb-4 rounded border border-red-300 bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-lg bg-white p-6 shadow"
      >
        {isAdmin && (
          <div>
            <label className="mb-2 block font-semibold">
              Користувач
            </label>

            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full rounded border p-2"
            >
              <option value="">
                Оберіть користувача
              </option>

              {users.map((user) => (
                <option
                  key={user._id}
                  value={user._id}
                >
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, index) => {
            const service = servicesMap.get(item.service);

            return (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <select
                  value={item.service}
                  onChange={(e) =>
                    updateItem(index, {
                      service: e.target.value,
                    })
                  }
                  className="flex-1 rounded border p-2"
                >
                  <option value="">
                    Оберіть послугу
                  </option>

                  {services.map((service) => (
                    <option
                      key={service._id}
                      value={service._id}
                    >
                      {service.name} — {service.price} грн
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateItem(index, {
                      quantity: Number(e.target.value),
                    })
                  }
                  className="w-20 rounded border p-2"
                />

                <div className="w-24 text-right">
                  {service
                    ? `${service.price * item.quantity} грн`
                    : "-"}
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                  className="rounded bg-red-600 px-3 py-2 text-white disabled:bg-gray-400"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          + Додати позицію
        </button>

        <div>
          <label className="mb-2 block font-semibold">
            Коментар
          </label>

          <textarea
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
            rows={3}
            className="w-full rounded border p-2"
          />
        </div>

        <div className="text-xl font-bold">
          Разом: {totalPrice} грн
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={
              isSubmitting || !canSubmit
            }
            className="rounded bg-green-600 px-6 py-3 text-white disabled:bg-gray-400"
          >
            {isSubmitting
              ? "Створення..."
              : "Створити замовлення"}
          </button>

          <Link
            href="/dashboard/orders"
            className="rounded bg-gray-300 px-6 py-3"
          >
            Скасувати
          </Link>
        </div>
      </form>
    </>
  );
}