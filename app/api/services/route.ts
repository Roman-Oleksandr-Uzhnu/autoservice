import { NextResponse } from "next/server";
import { services, addService } from "@/lib/services";

// GET /api/services
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let result = [...services];

  // Фільтр за категорією
  if (category && category !== "Всі") {
    result = result.filter(
      (service) => service.category === category
    );
  }

  // Пошук за назвою
  if (search) {
    result = result.filter((service) =>
      service.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  return NextResponse.json(result);
}

// POST /api/services
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        {
          error: "Поля name, category та price є обов'язковими",
        },
        {
          status: 400,
        }
      );
    }

    if (Number(body.price) <= 0) {
      return NextResponse.json(
        {
          error: "Ціна має бути більшою за 0",
        },
        {
          status: 400,
        }
      );
    }

    const newService = addService(body);

    return NextResponse.json(newService, {
      status: 201,
    });
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
}