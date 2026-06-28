import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

// GET /api/services
export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");

  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  const services = await Service.find(filter).sort({
    createdAt: -1,
  });

  return NextResponse.json({
    count: services.length,
    services,
  });
}

// POST /api/services
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const body = await request.json();

    const service = await Service.create(body);

    return NextResponse.json(service, {
      status: 201,
    });
  } catch (error: any) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(
        (err: any) => err.message
      );

      return NextResponse.json(
        {
          errors,
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