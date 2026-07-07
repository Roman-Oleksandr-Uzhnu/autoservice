"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  userId: string;
  currentRole: string;
  currentUserId: string;
};

export default function RoleToggle({
  userId,
  currentRole,
  currentUserId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (userId === currentUserId) {
    return <span className="text-xs text-gray-400">(ви)</span>;
  }

  const newRole =
    currentRole === "admin"
      ? "user"
      : "admin";

  async function handleToggle() {
    // ТЕСТ
    toast.success("Натиснув кнопку");

    setLoading(true);

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: newRole,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        toast.error(
          data.error || "Помилка зміни ролі"
        );

        return;
      }

      toast.success(`Роль змінено: ${newRole}`);

      router.refresh();
    } catch {
      toast.error("Помилка з'єднання");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="px-2 py-1 text-xs rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      {loading ? "..." : `→ ${newRole}`}
    </button>
  );
}