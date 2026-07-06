import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { authorize } from "@/lib/authorize";
import { updateRoleSchema } from "@/lib/validations/user";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { session, error } = await authorize("admin");
  if (error) return error;

  await dbConnect();

  try {
    const { id } = await params;

    const data = await request.json();

    // Валідація через Zod
    const result = updateRoleSchema.safeParse(data);

    if (!result.success) {
      const messages = result.error.issues.map((e) => e.message);

      return NextResponse.json(
        {
          error: messages.join(", "),
        },
        {
          status: 400,
        }
      );
    }

    const { role } = result.data;

    if (id === session.user.id) {
      return NextResponse.json(
        {
          error: "Не можна змінити власну роль",
        },
        {
          status: 400,
        }
      );
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      {
        new: true,
      }
    ).select("-password");

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

    return NextResponse.json(user);
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