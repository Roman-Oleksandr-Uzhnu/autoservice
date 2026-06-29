import MenuFilter from "@/components/MenuFilter";

export default function MenuPage() {
  return (
    <div>
      {/* Hero */}
     <section className="bg-gradient-to-r from-gray-900 to-red-700 text-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Наші послуги
          </h1>

          <p className="text-xl opacity-90">
            Оберіть потрібну послугу, скористайтеся пошуком або фільтрами
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <MenuFilter />
        </div>
      </section>
    </div>
  );
}