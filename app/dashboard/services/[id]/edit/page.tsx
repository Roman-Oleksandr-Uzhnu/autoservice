"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ServiceForm from "@/components/ServiceForm";

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function loadService() {
      try {
        const res = await fetch(`/api/services/${id}`);

        if (!res.ok) {
          throw new Error("Послугу не знайдено");
        }

        const data = await res.json();
        setService(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadService();
  }, [id]);

  async function handleSubmit(formData: any) {
    setSaving(true);

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Помилка оновлення");
      }

      router.push(`/dashboard/services/${id}`);
    } catch (err: any) {
      setError(err.message);
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="p-10">Завантаження...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <Link
        href={`/dashboard/services/${id}`}
        className="text-red-600 hover:underline"
      >
        ← Назад
      </Link>

      <div className="bg-white rounded-xl shadow p-8 mt-6">
        <h1 className="text-3xl font-bold mb-8">
          Редагувати послугу
        </h1>

        <ServiceForm
          initialData={service}
          onSubmit={handleSubmit}
          submitLabel="Зберегти"
          isSubmitting={saving}
          error={error}
        />
      </div>
    </div>
  );
}