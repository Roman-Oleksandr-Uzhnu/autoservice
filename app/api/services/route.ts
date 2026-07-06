import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";
import { authorize } from "@/lib/authorize";

// GET /api/services (публічний)
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

// POST /api/services (тільки admin)
export async function POST(request: Request) {
  const { error } = await authorize("admin");
  if (error) return error;

  try {
    await dbConnect();

    const body = await request.json();

    const service = await Service.create(body);

    return NextResponse.json(service, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      { error: "Помилка створення послуги" },
      { status: 400 }
    );
  }
}