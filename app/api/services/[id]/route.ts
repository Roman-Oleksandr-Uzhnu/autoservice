import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";
import mongoose from "mongoose";
import { authorize } from "@/lib/authorize";
import { updateServiceSchema } from "@/lib/validations/service";
import { sanitizeObject } from "@/lib/sanitize";

// GET /api/services/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await authorize("admin");
  if (error) return error;

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Невірний ID" },
      { status: 400 }
    );
  }

  await dbConnect();

  const service = await Service.findById(id);

  if (!service) {
    return NextResponse.json(
      { error: "Послугу не знайдено" },
      { status: 404 }
    );
  }

  return NextResponse.json(service);
}

// PUT /api/services/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await authorize("admin");
  if (error) return error;

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Невірний ID" },
        { status: 400 }
      );
    }

    await dbConnect();

    const data = await request.json();

    // Валідація через Zod
    const result = updateServiceSchema.safeParse(data);

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);

      return NextResponse.json(
        { errors: messages },
        { status: 400 }
      );
    }

    // Санітизація
    const sanitized = sanitizeObject(result.data);

    const updated = await Service.findByIdAndUpdate(
      id,
      sanitized,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Послугу не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Помилка сервера" },
      { status: 500 }
    );
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await authorize("admin");
  if (error) return error;

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Невірний ID" },
      { status: 400 }
    );
  }

  await dbConnect();

  const deleted = await Service.findByIdAndDelete(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Послугу не знайдено" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: "Послугу видалено",
    deleted,
  });
}