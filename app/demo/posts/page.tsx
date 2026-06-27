export default async function PostsPage() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const posts = await response.json();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Пости з JSONPlaceholder
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.slice(0, 9).map((post: any) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-bold mb-3 text-gray-900">
              {post.title}
            </h2>

            <p className="text-gray-600 mb-4">
              {post.body}
            </p>

            <div className="text-sm text-gray-500">
              Post #{post.id} • User {post.userId}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}