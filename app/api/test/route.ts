import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI!;

    await mongoose.connect(uri);

    return NextResponse.json({
      success: true,
      message: "MongoDB підключено",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      {
        status: 500,
      }
    );
  }
}