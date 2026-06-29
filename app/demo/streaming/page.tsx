import { Suspense } from "react";
import {
  PostSkeleton,
  StatSkeleton,
} from "@/components/skeletons/PostSkeleton";

async function FastStats() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return (
    <div className="grid md:grid-cols-3 gap-6 mb-10">
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Замовлень</h3>
        <p className="text-4xl font-bold text-red-600">128</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Клієнтів</h3>
        <p className="text-4xl font-bold text-green-600">56</p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-gray-500">Послуг</h3>
        <p className="text-4xl font-bold text-blue-600">18</p>
      </div>
    </div>
  );
}

async function SlowPosts() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3"
  );

  const posts = await response.json();

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold mb-4">
        Новини
      </h2>

      {posts.map((post: any) => (
        <article
          key={post.id}
          className="bg-white rounded-xl shadow p-6"
        >
          <h3 className="text-xl font-bold mb-2">
            {post.title}
          </h3>

          <p className="text-gray-600">
            {post.body}
          </p>
        </article>
      ))}
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">
        Streaming Demo
      </h1>

      <Suspense
        fallback={
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        }
      >
        <FastStats />
      </Suspense>

      <Suspense
        fallback={
          <div className="space-y-4">
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </div>
        }
      >
        <SlowPosts />
      </Suspense>
    </div>
  );
}