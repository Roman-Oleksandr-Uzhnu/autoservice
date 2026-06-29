export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="h-24 w-24 rounded-full border-4 border-gray-300 border-t-blue-600 animate-spin mx-auto"></div>

        <p className="mt-6 text-2xl text-gray-700">
          Завантаження...
        </p>
      </div>
    </div>
  );
}