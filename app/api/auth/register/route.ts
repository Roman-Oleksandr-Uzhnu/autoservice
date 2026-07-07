import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import { registerSchema } from "@/lib/validations/user";
import { stripHtml } from "@/lib/sanitize";

export async function POST(request: Request) {
  try {
    await dbConnect();

    let data: unknown;

    try {
      data = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Невалідний JSON у тілі запиту",
        },
        {
          status: 400,
        }
      );
    }

    // Валідація через Zod
    const result = registerSchema.safeParse(data);

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

    const { email, password } = result.data;
    const name = stripHtml(result.data.name);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Користувач з таким email вже існує",
        },
        {
          status: 409,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });

    return NextResponse.json(
      {
        message: "Користувача успішно створено",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      return NextResponse.json(
        {
          error: "Користувач з таким email вже існує",
        },
        {
          status: 409,
        }
      );
    }

    console.error(error);

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
