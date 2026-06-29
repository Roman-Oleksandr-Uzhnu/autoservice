"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  serviceId: number;
};

export default function ServiceActions({
  serviceId,
}: Props) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);

  function handleDelete() {
    console.log(`Видалення послуги ${serviceId}`);

    setShowConfirm(false);

    router.push("/dashboard/services");
  }

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-red-600 font-semibold">
          Видалити?
        </span>

        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          Так
        </button>

        <button
          onClick={() => setShowConfirm(false)}
          className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400"
        >
          Ні
        </button>
      </div>
    );
  }

  return (
    <div className="space-x-2">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Редагувати
      </button>

      <button
        onClick={() => setShowConfirm(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Видалити
      </button>
    </div>
  );
}