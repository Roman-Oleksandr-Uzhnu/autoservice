import { notFound } from "next/navigation";

const users = {
  "1": { id: 1, name: "John Doe" },
  "2": { id: 2, name: "Jane Smith" },
  "3": { id: 3, name: "Bob Johnson" },
};

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserPage({
  params,
}: Props) {
  const { id } = await params;

  const user = users[id as keyof typeof users];

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">
        Користувач: {user.name}
      </h1>

      <p className="text-gray-600">
        ID: {user.id}
      </p>
    </div>
  );
}