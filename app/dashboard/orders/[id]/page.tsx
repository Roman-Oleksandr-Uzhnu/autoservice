import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderPage({
  params,
}: Props) {
  const { id } = await params;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold">
        Замовлення
      </h1>

      <p>ID: {id}</p>
    </div>
  );
}