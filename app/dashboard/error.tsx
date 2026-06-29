"use client";

import { useEffect } from "react";
import Link from "next/link";

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({
  error,
  reset,
}: Props) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto mt-12 bg-red-50 border border-red-200 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-red-600 mb-4">
        Помилка Dashboard
      </h2>

      <p className="text-gray-700 mb-8">
        {error.message}
      </p>

      <div className="flex gap-4">
        <button
          onClick={reset}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Спробувати ще раз
        </button>

        <Link
          href="/"
          className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400"
        >
          На головну
        </Link>
      </div>
    </div>
  );
}