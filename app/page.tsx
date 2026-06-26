
import {
  FaCar,
  FaTools,
  FaOilCan,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

const services = [
  { icon: <FaTools className="text-4xl text-red-600" />, title: "Комп'ютерна діагностика", text: "Повна перевірка всіх систем автомобіля." },
  { icon: <FaOilCan className="text-4xl text-red-600" />, title: "Заміна масла", text: "Швидка заміна масла та всіх фільтрів." },
  { icon: <FaCar className="text-4xl text-red-600" />, title: "Ремонт двигуна", text: "Ремонт двигунів будь-якої складності." },
  { icon: <FaTools className="text-4xl text-red-600" />, title: "Ходова частина", text: "Діагностика та ремонт підвіски." },
  { icon: <FaCar className="text-4xl text-red-600" />, title: "Шиномонтаж", text: "Балансування та сезонна заміна шин." },
  { icon: <FaTools className="text-4xl text-red-600" />, title: "Автоелектрика", text: "Пошук і усунення несправностей." },
];

export default function Home() {
  return (
    <main className="bg-gray-100 text-gray-900">
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

      <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold text-lg">
        Записатися
      </button>

    </div>
  </div>

</section>
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Наші послуги</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition">
              {s.icon}
              <h3 className="text-2xl font-bold mt-4 mb-3">{s.title}</h3>
              <p className="text-gray-600">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Чому обирають нас?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              ["10+ років досвіду", <FaStar />],
              ["Гарантія на роботи", <FaCheckCircle />],
              ["Сучасне обладнання", <FaTools />],
              ["Швидке обслуговування", <FaClock />],
            ].map(([t, i]) => (
              <div key={String(t)} className="flex items-center gap-4 bg-gray-100 p-6 rounded-xl shadow">
                <div className="text-3xl text-red-600">{i}</div>
                <p className="text-xl font-semibold">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Відгуки</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Дуже швидко та якісно!", "Чудовий сервіс і доступні ціни.", "Рекомендую всім власникам авто."].map((r) => (
            <div key={r} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex text-yellow-500 mb-3">★★★★★</div>
              <p>{r}</p>
            </div>
          ))}
        </div>
      </section>

      <footer id="contacts" className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-6">Контакти</h2>
            <p className="flex items-center gap-3 mb-3"><FaMapMarkerAlt /> м. Ужгород</p>
            <p className="flex items-center gap-3 mb-3"><FaPhone /> +380 99 123 45 67</p>
            <p>Email: autoservice@gmail.com</p>
          </div>
          <div className="rounded-xl overflow-hidden">
            <iframe
              title="map"
              className="w-full h-72"
              loading="lazy"
              src="https://maps.google.com/maps?q=Uzhhorod&t=&z=13&ie=UTF8&iwloc=&output=embed">
            </iframe>
          </div>
        </div>
      </footer>
    </main>
  );
}
