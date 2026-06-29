export default async function SlowPage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const posts = await response.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Повільна сторінка (3 сек)
      </h1>

      <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mb-8">
        <p className="text-yellow-800">
          Ця сторінка спеціально завантажується 3 секунди.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {posts.slice(0, 6).map((post: any) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow p-6"
          >
            <h2 className="font-bold text-xl mb-3">
              {post.title}
            </h2>

            <p className="text-gray-600">
              {post.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}