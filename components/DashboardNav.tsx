"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Огляд",
  },
  {
    href: "/dashboard/services",
    label: "Послуги",
  },
  {
    href: "/dashboard/orders",
    label: "Замовлення",
  },
  {
    href: "/dashboard/clients",
    label: "Клієнти",
  },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav>
      <ul className="space-y-3">
        {links.map((link) => {
          const isActive =
            link.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-lg px-4 py-3 transition ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}