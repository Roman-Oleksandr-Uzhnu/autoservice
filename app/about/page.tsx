export default function AboutPage() {
  return (
    <main className="bg-gray-100 min-h-screen">
      <section className="bg-gradient-to-r from-gray-900 to-red-700 text-white pt-32 pb-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Про AutoService
          </h1>

          <p className="text-xl opacity-90">
            Надійний автосервіс для ремонту та обслуговування вашого автомобіля.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto py-16 px-6">
        <div className="bg-white rounded-2xl shadow-lg p-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Хто ми?
          </h2>

          <p className="text-gray-700 leading-8 mb-6">
            AutoService — сучасний автосервіс, який спеціалізується на
            комп'ютерній діагностиці, ремонті двигунів, технічному
            обслуговуванні, шиномонтажі та автоелектриці.
          </p>

          <p className="text-gray-700 leading-8 mb-6">
            Ми використовуємо сучасне обладнання та якісні комплектуючі,
            щоб кожен автомобіль отримував професійне обслуговування.
          </p>

          <p className="text-gray-700 leading-8">
            Наші майстри мають багаторічний досвід та допомагають клієнтам
            швидко повернути автомобіль у відмінний технічний стан.
          </p>
        </div>
      </section>
    </main>
  );
}