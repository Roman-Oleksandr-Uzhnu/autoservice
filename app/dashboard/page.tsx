import StatsCard from "@/components/StatsCard";
import {
  getServiceStats,
  getOrderStats,
} from "@/lib/helpers";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const isAdmin = session.user.role === "admin";

  const [stats, orderStats] = await Promise.all([
    getServiceStats(),
    isAdmin ? getOrderStats() : Promise.resolve(null),
  ]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Огляд
      </h1>

      <p className="mb-6 text-gray-600">
        Вітаємо, <strong>{session.user?.name}</strong>!
      </p>

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

      {isAdmin && orderStats && (
        <>
          <h2 className="text-2xl font-bold mt-10 mb-6">
            Статистика замовлень
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Всього замовлень"
              value={orderStats.total}
              color="red"
            />

            <StatsCard
              title="Очікують"
              value={orderStats.pending}
              color="blue"
            />

            <StatsCard
              title="Виконано"
              value={orderStats.completed}
              color="green"
            />
          </div>
        </>
      )}
    </div>
  );
}