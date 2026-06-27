export const metadata = {
  title: "Контакти",
  description: "Контакти AutoService",
};

export default function ContactPage() {
  return (
    <div>
      <section className="bg-gradient-to-r from-slate-900 to-red-700 text-white py-14">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-3">
            Контакти
          </h1>
          <p className="text-lg opacity-90">
            Зв'яжіться з нами або завітайте до нашого автосервісу
          </p>
        </div>
      </section>

      <section className="py-14 bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">

            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Наші контакти
              </h2>

              <div className="space-y-6">

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    📍 Адреса
                  </h3>
                  <p className="text-gray-700">
                    вул. Собранецька, 1
                  </p>
                  <p className="text-gray-700">
                    м. Ужгород
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    📞 Телефон
                  </h3>
                  <p className="text-gray-700">
                    +380 99 123 45 67
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    ✉ Email
                  </h3>
                  <p className="text-gray-700">
                    autoservice@gmail.com
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    🕒 Графік роботи
                  </h3>
                  <p className="text-gray-700">
                    Пн-Пт: 09:00 – 18:00
                  </p>
                  <p className="text-gray-700">
                    Сб: 10:00 – 15:00
                  </p>
                  <p className="text-gray-700">
                    Неділя — вихідний
                  </p>
                </div>

              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Зворотний зв'язок
              </h2>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <p className="text-gray-700 leading-7">
                  Форма для запису на ремонт та надсилання повідомлень
                  буде реалізована у наступних лабораторних роботах.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}