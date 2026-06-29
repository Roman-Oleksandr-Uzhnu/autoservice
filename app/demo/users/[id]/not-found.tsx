import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Користувача не знайдено
        </h2>

        <p className="text-gray-500 mb-8">
          Користувача з таким ID не існує.
        </p>

        <Link
          href="/demo/users/1"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          До користувача №1
        </Link>
      </div>
    </div>
  );
}