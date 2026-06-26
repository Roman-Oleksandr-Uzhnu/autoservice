import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white py-4">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-red-500 transition"
        >
          AutoService
        </Link>

        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="/" className="hover:text-red-500 transition">
                Головна
              </Link>
            </li>

            <li>
              <Link href="/menu" className="hover:text-red-500 transition">
                Послуги
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-red-500 transition">
                Про нас
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}