"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/lib/context/CartContext";

export default function Header() {
  const { data: session } = useSession();
  const { items } = useCart();

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-2xl font-bold"
        >
          AutoService
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/">Головна</Link>
          <Link href="/menu">Послуги</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/cart" className="relative hover:text-gray-300">
            🛒 Кошик
            {items.length > 0 && (
              <span className="ml-1 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {items.length}
              </span>
            )}
          </Link>

          {session ? (
            <div className="flex items-center gap-3 border-l border-gray-600 pl-4">
              <span>{session.user?.name}</span>

              <span
                className={`px-2 py-1 rounded text-xs ${
                  session.user.role === "admin"
                    ? "bg-red-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                {session.user.role}
              </span>

              <button
                onClick={() =>
                  signOut({ callbackUrl: "/" })
                }
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
              >
                Вийти
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                href="/auth/login"
                className="hover:text-gray-300"
              >
                Увійти
              </Link>

              <Link
                href="/auth/register"
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
              >
                Реєстрація
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}