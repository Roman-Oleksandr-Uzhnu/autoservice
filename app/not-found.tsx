import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-100">
      <div className="text-center">

        <p className="text-7xl mb-6">🚗</p>

        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          404
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Такої сторінки не існує.
        </p>

        <Link
          href="/"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition"
        >
          Повернутися на головну
        </Link>

      </div>
    </div>
  );
}