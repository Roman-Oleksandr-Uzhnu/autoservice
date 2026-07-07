"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginSchema } from "@/lib/validations/auth";
import FormField from "@/components/forms/FormField";

type LoginData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginData) {
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (result?.error) {
        setError("password", {
          type: "server",
          message: "Невірний email або пароль",
        });

        toast.error("Не вдалося увійти");
        return;
      }

      toast.success("Вхід успішний");

      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Помилка авторизації");
    }
  }

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-3xl font-bold mb-8">
        Вхід
      </h1>

      <button
        type="button"
        onClick={() => toast.success("Тестовий toast")}
        className="mb-6 w-full rounded bg-green-600 py-3 text-white"
      >
        Test Toast
      </button>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
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

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-red-600 text-white py-3 rounded disabled:opacity-50"
        >
          {isSubmitting ? "Вхід..." : "Увійти"}
        </button>
      </form>
    </div>
  );
}