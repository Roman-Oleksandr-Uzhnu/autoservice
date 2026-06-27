export const services = [
  {
    id: 1,
    name: "Комп'ютерна діагностика",
    description: "Повна перевірка електронних систем автомобіля.",
    price: 1200,
    icon: "🔧",
    category: "Діагностика",
    available: true,
  },
  {
    id: 2,
    name: "Заміна масла",
    description: "Заміна масла та всіх необхідних фільтрів.",
    price: 900,
    icon: "🛢️",
    category: "ТО",
    available: true,
  },
  {
    id: 3,
    name: "Ремонт двигуна",
    description: "Ремонт двигунів будь-якої складності.",
    price: 6500,
    icon: "⚙️",
    category: "Ремонт",
    available: true,
  },
  {
    id: 4,
    name: "Ходова частина",
    description: "Ремонт та діагностика підвіски.",
    price: 2800,
    icon: "🚗",
    category: "Ремонт",
    available: true,
  },
  {
    id: 5,
    name: "Шиномонтаж",
    description: "Балансування та заміна шин.",
    price: 800,
    icon: "🛞",
    category: "Шини",
    available: false,
  },
  {
    id: 6,
    name: "Автоелектрика",
    description: "Ремонт електрики автомобіля.",
    price: 2200,
    icon: "⚡",
    category: "Електрика",
    available: true,
  },
  {
    id: 7,
    name: "Заправка кондиціонера",
    description: "Заправка та діагностика кондиціонера.",
    price: 1800,
    icon: "❄️",
    category: "ТО",
    available: true,
  },
  {
    id: 8,
    name: "Гальмівна система",
    description: "Заміна колодок та дисків.",
    price: 2400,
    icon: "🛑",
    category: "Ремонт",
    available: true,
  },
];

export function getServiceById(id: number | string) {
  return services.find((service) => service.id === Number(id));
}

export function getCategories() {
  return ["Всі", ...new Set(services.map((service) => service.category))];
}