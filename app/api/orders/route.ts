import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Order from "@/lib/models/Order";
import OrderItem from "@/lib/models/OrderItem";
import Service from "@/lib/models/Service";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import { createOrderSchema } from "@/lib/validations/order";
import { sanitizeObject } from "@/lib/sanitize";

// Реєструємо моделі для populate
void [User, Service, OrderItem];

export async function GET(request: Request) {
  const { session, error } = await authorize();
  if (error) return error;

  await dbConnect();

  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");
  const service = searchParams.get("service");

  const filter: any =
    session.user.role === "admin"
      ? {}
      : { user: session.user.id };

  if (status) {
    filter.status = status;
  }

  if (service) {
    const orderIds = await OrderItem.find({
      service,
    }).distinct("order");

    filter._id = {
      $in: orderIds,
    };
  }

  const orders = await Order.find(filter)
    .populate({
      path: "user",
      select: "name email role",
    })
    .populate({
      path: "items",
      populate: {
        path: "service",
      },
    })
    .sort({
      createdAt: -1,
    });

  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  const { session, error } = await authorize();

  if (error) return error;

  await dbConnect();

  let createdOrderId = null;

  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Невалідний JSON",
        },
        {
          status: 400,
        }
      );
    }

    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.issues.map(
            (e) => e.message
          ),
        },
        {
          status: 400,
        }
      );
    }

    const data = sanitizeObject(result.data);

    let orderUserId = session.user.id;

    if (
      session.user.role === "admin" &&
      data.user
    ) {
      const user = await User.findById(data.user);

      if (!user) {
        return NextResponse.json(
          {
            error: "Користувача не знайдено",
          },
          {
            status: 404,
          }
        );
      }

      orderUserId = user._id.toString();
    }

    const serviceIds = data.items.map(
      (item: { service: string }) => item.service
    );

    const services = await Service.find({
      _id: {
        $in: serviceIds,
      },
    });

    const servicesMap = new Map(
      services.map((service) => [
        service._id.toString(),
        service,
      ])
    );
    for (const item of data.items as { service: string; quantity: number }[]) {
      const service = servicesMap.get(item.service);

      if (!service) {
        return NextResponse.json(
          {
            error: `Послугу не знайдено: ${item.service}`,
          },
          {
            status: 404,
          }
        );
      }

      if (!service.available) {
        return NextResponse.json(
          {
            error: `Послуга недоступна: ${service.name}`,
          },
          {
            status: 409,
          }
        );
      }
    }

    const totalPrice = data.items.reduce(
      (sum: number, item: { service: string; quantity: number }) => {
        const service = servicesMap.get(item.service)!;

        return sum + service.price * item.quantity;
      },
      0
    );

    const order = await Order.create({
      user: orderUserId,
      totalPrice,
      notes: data.notes,
    });

    createdOrderId = order._id;

    const items = data.items.map(
      (item: { service: string; quantity: number }) => {
        const service = servicesMap.get(item.service)!;

        return {
          order: order._id,
          service: service._id,
          quantity: item.quantity,
          priceAtOrder: service.price,
        };
      }
    );

    await OrderItem.insertMany(items);

    const populated = await Order.findById(order._id)
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

    return NextResponse.json(populated, {
      status: 201,
    });
  } catch (error) {
    if (createdOrderId) {
      await Order.deleteOne({
        _id: createdOrderId,
      });
    }

    if (
      error instanceof SyntaxError ||
      (error instanceof Error &&
        error.message ===
          "Unexpected end of JSON input")
    ) {
      return NextResponse.json(
        {
          error: "Невалідний JSON",
        },
        {
          status: 400,
        }
      );
    }

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