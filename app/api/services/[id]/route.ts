import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";
import mongoose from "mongoose";
import { authorize } from "@/lib/authorize";

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

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { error: "Невірний ID" },
      { status: 400 }
    );
  }

  await dbConnect();

  const body = await request.json();

  const updated = await Service.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });

  if (!updated) {
    return NextResponse.json(
      { error: "Послугу не знайдено" },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

// DELETE /api/services/[id]
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
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