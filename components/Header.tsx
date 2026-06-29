"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/menu", label: "Послуги" },
  { href: "/about", label: "Про нас" },
  { href: "/contact", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <header className="bg-slate-900 text-white py-5 shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center">

        <Link
          href="/"
          className="text-3xl font-bold text-red-500"
        >
          AutoService
        </Link>

        <nav className="flex items-center gap-8">

          <ul className="flex gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={
                      isActive
                        ? "text-red-500"
                        : "hover:text-red-400"
                    }
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {session ? (
            <>
              <span className="text-sm">
                {session.user?.name}
              </span>

              <button
                onClick={() => signOut()}
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hover:text-red-400"
              >
                Увійти
              </Link>

              <Link
                href="/auth/register"
                className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
              >
                Реєстрація
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}