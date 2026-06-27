export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div>

      <h1 className="text-4xl font-bold text-gray-900 mb-10">
        Огляд
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-gray-500 font-semibold">
            Послуг
          </h3>

          <p className="text-5xl text-red-600 font-bold mt-3">
            8
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-gray-500 font-semibold">
            Клієнтів
          </h3>

          <p className="text-5xl text-green-600 font-bold mt-3">
            132
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-gray-500 font-semibold">
            Замовлень
          </h3>

          <p className="text-5xl text-blue-600 font-bold mt-3">
            57
          </p>
        </div>

      </div>

    </div>
  );
}