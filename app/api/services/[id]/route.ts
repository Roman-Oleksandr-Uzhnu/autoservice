import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

// GET /api/services/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  try {
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json(
        { error: "Послугу не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch {
    return NextResponse.json(
      { error: "Невалідний ID" },
      { status: 400 }
    );
  }
}

// PUT /api/services/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  try {
    const body = await request.json();

    const service = await Service.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return NextResponse.json(
        { error: "Послугу не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return NextResponse.json(
        { errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  try {
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return NextResponse.json(
        { error: "Послугу не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Послугу "${service.name}" видалено`,
    });
  } catch {
    return NextResponse.json(
      { error: "Невалідний ID" },
      { status: 400 }
    );
  }
}