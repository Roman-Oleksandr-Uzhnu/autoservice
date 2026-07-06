import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import RoleToggle from "@/components/RoleToggle";

export const metadata = {
  title: "Користувачі | Dashboard",
};

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  await dbConnect();

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Управління користувачами
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">Ім’я</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Роль</th>
              <th className="px-6 py-3 text-left">Дата реєстрації</th>
              <th className="px-6 py-3 text-left">Дії</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user._id.toString()}>
                <td className="px-6 py-4">{user.name}</td>

                <td className="px-6 py-4">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.role === "admin"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString("uk-UA")}
                </td>

                <td className="px-6 py-4">
                  <RoleToggle
                    userId={user._id.toString()}
                    currentRole={user.role}
                    currentUserId={session.user.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4">
        Всього користувачів: {users.length}
      </p>
    </div>
  );
}