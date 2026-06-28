import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Service from "@/lib/models/Service";

const initialServices = [
  {
    name: "Комп'ютерна діагностика",
    description: "Повна перевірка електронних систем автомобіля.",
    price: 1200,
    icon: "🔧",
    category: "Діагностика",
    available: true,
  },
  {
    name: "Заміна масла",
    description: "Заміна масла та всіх необхідних фільтрів.",
    price: 900,
    icon: "🛢️",
    category: "ТО",
    available: true,
  },
  {
    name: "Ремонт двигуна",
    description: "Ремонт двигунів будь-якої складності.",
    price: 6500,
    icon: "⚙️",
    category: "Ремонт",
    available: true,
  },
  {
    name: "Ходова частина",
    description: "Ремонт та діагностика підвіски.",
    price: 2800,
    icon: "🚗",
    category: "Ремонт",
    available: true,
  },
  {
    name: "Шиномонтаж",
    description: "Балансування та заміна шин.",
    price: 800,
    icon: "🛞",
    category: "Шини",
    available: false,
  },
  {
    name: "Автоелектрика",
    description: "Ремонт електрики автомобіля.",
    price: 2200,
    icon: "⚡",
    category: "Електрика",
    available: true,
  },
  {
    name: "Заправка кондиціонера",
    description: "Заправка та діагностика кондиціонера.",
    price: 1800,
    icon: "❄️",
    category: "ТО",
    available: true,
  },
  {
    name: "Гальмівна система",
    description: "Заміна колодок та дисків.",
    price: 2400,
    icon: "🛑",
    category: "Ремонт",
    available: true,
  },
];

export async function GET() {
  try {
    await dbConnect();

    await Service.deleteMany({});

    const services = await Service.create(initialServices);

    return NextResponse.json({
      message: `Базу наповнено (${services.length} послуг)`,
      services,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}