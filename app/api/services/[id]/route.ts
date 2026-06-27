import { NextResponse } from "next/server";
import {
  getServiceById,
  updateService,
  deleteService,
} from "@/lib/services";

// GET /api/services/[id]
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const service = getServiceById(id);

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
  const { id } = await params;

  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        {
          error: "Поля name, category та price є обов'язковими",
        },
        { status: 400 }
      );
    }

    const updated = updateService(id, body);

    if (!updated) {
      return NextResponse.json(
        { error: "Послугу не знайдено" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Невалідний JSON" },
      { status: 400 }
    );
  }
}

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const deleted = deleteService(id);

  if (!deleted) {
    return NextResponse.json(
      { error: "Послугу не знайдено" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: `Послугу "${deleted.name}" видалено`,
    deleted,
  });
}