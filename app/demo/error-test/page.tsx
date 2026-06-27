export const dynamic = "force-dynamic";

export default async function ErrorTestPage() {
  const shouldFail = Math.random() > 0.5;

  if (shouldFail) {
    throw new Error("Випадкова помилка для тестування");
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-green-100 border border-green-300 rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Успіх!
        </h1>

        <p className="text-green-700">
          Помилки не сталося. Оновіть сторінку — є 50% шанс побачити error.js.
        </p>
      </div>
    </div>
  );
}