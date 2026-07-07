"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerFormSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: RegisterData) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const body = await res.json().catch(() => ({}));

      if (res.status === 409) {
        setError("email", {
          type: "server",
          message: body.error || "Email вже існує",
        });

        toast.error("Email вже зайнятий");
        return;
      }

      if (!res.ok) {
        toast.error(body.error || "Помилка реєстрації");
        return;
      }

      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.success("Реєстрація успішна");
        router.push("/auth/login");
        return;
      }

      toast.success("Реєстрація успішна");

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка з'єднання");
    }
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-8">
        Реєстрація
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          label="Ім'я"
          error={errors.name?.message}
        >
          <input
            type="text"
            className="w-full border p-3 rounded"
            {...register("name")}
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email?.message}
        >
          <input
            type="email"
            className="w-full border p-3 rounded"
            {...register("email")}
          />
        </FormField>

        <FormField
          label="Пароль"
          error={errors.password?.message}
        >
          <input
            type="password"
            className="w-full border p-3 rounded"
            {...register("password")}
          />
        </FormField>

        <FormField
          label="Підтвердження пароля"
          error={errors.confirmPassword?.message}
        >
          <input
            type="password"
            className="w-full border p-3 rounded"
            {...register("confirmPassword")}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white py-3 rounded disabled:opacity-50"
        >
          {isSubmitting
            ? "Реєстрація..."
            : "Зареєструватися"}
        </button>
      </form>
    </div>
  );
}