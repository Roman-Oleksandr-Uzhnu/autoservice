import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Service from "@/lib/models/Service";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import {
  updateOrderSchema,
  userUpdateOrderSchema,
} from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

void [Service, User, OrderItem];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { id } = await params;

  try {
    const order = await Order.findById(id)
      .populate({
        path: "user",
        select: "name email role",
      })
      .populate({
        path: "items",
        populate: {
          path: "service",
        },
      });

    if (!order) {
      return NextResponse.json(
        { error: "Не знайдено" },
        { status: 404 }
      );
    }

    const isOwner =
      order.user?._id?.toString() === session.user.id;

    if (
      session.user.role !== "admin" &&
      !isOwner
    ) {
      return NextResponse.json(
        { error: "Немає доступу" },
        { status: 403 }
      );
    }

    return NextResponse.json(order);
  } catch {
    return NextResponse.json(
      { error: "Невалідний ID" },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { id } = await params;

  try {
    const order = await Order.findById(id);

    if (!order) {
      return NextResponse.json(
        { error: "Не знайдено" },
        { status: 404 }
      );
    }

    const isAdmin = session.user.role === "admin";
    const isOwner =
      order.user.toString() === session.user.id;

    if (!isAdmin && !isOwner) {
      return NextResponse.json(
        { error: "Немає доступу" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const schema = isAdmin
      ? updateOrderSchema
      : userUpdateOrderSchema;

    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.issues.map(
            (e) => e.message
          ),
        },
        { status: 400 }
      );
    }

    if (
      !isAdmin &&
      order.status !== "pending"
    ) {
      return NextResponse.json(
        {
          error:
            "Скасувати можна лише pending замовлення",
        },
        {
          status: 409,
        }
      );
    }

    const updated =
      await Order.findByIdAndUpdate(
        id,
        sanitizeObject(result.data),
        {
          new: true,
          runValidators: true,
        }
      )
        .populate({
          path: "user",
          select: "name email role",
        })
        .populate({
          path: "items",
          populate: {
            path: "service",
          },
        });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      {
        error: "Помилка сервера",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } =
    await authorize("admin");

  if (error) return error;

  await dbConnect();

  const { id } = await params;

  try {
    const deleted =
      await Order.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Не знайдено",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      message: "Замовлення видалено",
    });
  } catch {
    return NextResponse.json(
      {
        error: "Невалідний ID",
      },
      {
        status: 400,
      }
    );
  }
}