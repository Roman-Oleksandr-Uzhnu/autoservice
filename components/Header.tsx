"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/menu", label: "Послуги" },
  { href: "/about", label: "Про нас" },
  { href: "/contact", label: "Контакти" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-slate-900 text-white py-5 shadow-lg">
      <div className="container mx-auto px-6 flex justify-between items-center">

        <Link
          href="/"
          className="text-3xl font-bold text-red-500"
        >
          AutoService
        </Link>

        <nav>
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
                    className={`transition font-medium ${
                      isActive
                        ? "text-red-500"
                        : "hover:text-red-400"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

          </ul>
        </nav>

      </div>
    </header>
  );
}