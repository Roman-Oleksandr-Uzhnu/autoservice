export const revalidate = 10;

export default async function RevalidatedPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/2"
  );

  const post = await response.json();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">
        Revalidated пост
      </h1>

      <div className="bg-green-100 border border-green-300 rounded-lg p-5 mb-8">
        <p>
          У production оновлюється кожні 10 секунд.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4">
          {post.title}
        </h2>

        <p className="text-gray-700 mb-6">
          {post.body}
        </p>

        <p className="text-gray-500">
          {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}