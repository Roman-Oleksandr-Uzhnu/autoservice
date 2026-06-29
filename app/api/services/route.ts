import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

// GET /api/services
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

// POST /api/services
export async function POST(request: Request) {
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