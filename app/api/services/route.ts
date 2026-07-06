import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";
import { authorize } from "@/lib/authorize";
import { createServiceSchema } from "@/lib/validations/service";
import { sanitizeObject } from "@/lib/sanitize";

export async function GET() {
  try {
    await dbConnect();

    const services = await Service.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(services);
  } catch {
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const { error } = await authorize("admin");
  if (error) return error;

  try {
    await dbConnect();

    const data = await request.json();

    // Валідація через Zod
    const result = createServiceSchema.safeParse(data);

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);

      return NextResponse.json(
        { errors: messages },
        { status: 400 }
      );
    }

    // Санітизація
    const sanitized = sanitizeObject(result.data);

    const service = await Service.create(sanitized);

    return NextResponse.json(service, {
      status: 201,
    });
  } catch (error) {
    if (
      error instanceof SyntaxError ||
      (error instanceof Error &&
        error.message === "Unexpected end of JSON input")
    ) {
      return NextResponse.json(
        { error: "Невалідний JSON у тілі запиту" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}