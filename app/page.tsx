import ServiceCard from "@/components/ServiceCard";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaTools,
} from "react-icons/fa";

const popularServices = [
  {
    id: 1,
    name: "Комп'ютерна діагностика",
    description: "Повна перевірка всіх систем автомобіля.",
    price: 1200,
    icon: "🔧",
    category: "Діагностика",
    available: true,
  },
  {
    id: 2,
    name: "Заміна масла",
    description: "Швидка заміна масла та всіх фільтрів.",
    price: 900,
    icon: "🛢️",
    category: "ТО",
    available: true,
  },
  {
    id: 3,
    name: "Ремонт двигуна",
    description: "Ремонт двигунів будь-якої складності.",
    price: 6500,
    icon: "⚙️",
    category: "Ремонт",
    available: true,
  },
  {
    id: 4,
    name: "Ходова частина",
    description: "Діагностика та ремонт підвіски.",
    price: 2500,
    icon: "🚗",
    category: "Ремонт",
    available: true,
  },
  {
    id: 5,
    name: "Шиномонтаж",
    description: "Балансування та сезонна заміна шин.",
    price: 700,
    icon: "🛞",
    category: "Шини",
    available: false,
  },
  {
    id: 6,
    name: "Автоелектрика",
    description: "Пошук та усунення електричних несправностей.",
    price: 1800,
    icon: "⚡",
    category: "Електрика",
    available: true,
  },
];

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        <img
          src="/hero.jpg"
          alt="Auto Service"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 flex h-full items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">
            <h1 className="text-6xl font-bold mb-6">
              AutoService
            </h1>

            <p className="text-xl max-w-2xl mb-8">
              Професійний ремонт автомобілів,
              комп'ютерна діагностика,
              технічне обслуговування
              та шиномонтаж.
            </p>

            <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-lg transition">
              Записатися
            </button>
          </div>
        </div>
      </section>

      {/* ПОСЛУГИ */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Наші послуги
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularServices.map((service) => (
            <ServiceCard
              key={service.id}
              {...service}
            />
          ))}
        </div>
      </section>

      {/* ПЕРЕВАГИ */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Чому обирають нас?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              ["10+ років досвіду", <FaStar />],
              ["Гарантія на роботи", <FaCheckCircle />],
              ["Сучасне обладнання", <FaTools />],
              ["Швидке обслуговування", <FaClock />],
            ].map(([text, icon]) => (
              <div
                key={String(text)}
                className="flex items-center gap-4 bg-gray-100 p-6 rounded-xl shadow"
              >
                <div className="text-3xl text-red-600">
                  {icon}
                </div>

                <p className="text-xl font-semibold">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
            {/* ВІДГУКИ */}
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Відгуки
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Дуже швидко та якісно!",
            "Чудовий сервіс і доступні ціни.",
            "Рекомендую всім власникам авто.",
          ].map((review) => (
            <div
              key={review}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex text-yellow-500 mb-3">
                ★★★★★
              </div>

              <p>{review}</p>
            </div>
          ))}
        </div>
      </section>

      {/* КОНТАКТИ */}
      <section
        id="contacts"
        className="bg-gray-900 text-white py-16"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Контакти
            </h2>

            <p className="flex items-center gap-3 mb-3">
              <FaMapMarkerAlt />
              м. Ужгород
            </p>

            <p className="flex items-center gap-3 mb-3">
              <FaPhone />
              +380 99 123 45 67
            </p>

            <p>autoservice@gmail.com</p>
          </div>

          <div className="rounded-xl overflow-hidden">
            <iframe
              title="map"
              className="w-full h-72"
              loading="lazy"
              src="https://maps.google.com/maps?q=Uzhhorod&t=&z=13&ie=UTF8&iwloc=&output=embed"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}