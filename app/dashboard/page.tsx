import StatsCard from "@/components/StatsCard";
import { getServiceStats } from "@/lib/helpers";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const stats = await getServiceStats();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Огляд
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Послуг"
          value={stats.total}
          color="red"
        />

        <StatsCard
          title="Доступно"
          value={stats.available}
          color="green"
        />

        <StatsCard
          title="Середня ціна"
          value={`${stats.avgPrice} грн`}
          color="blue"
        />
      </div>

      <div className="mt-10 bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">
          Загальна інформація
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            Недоступних послуг:{" "}
            <span className="font-semibold">
              {stats.unavailable}
            </span>
          </p>

          <p>
            Категорій послуг:{" "}
            <span className="font-semibold">
              {stats.categoriesCount}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}