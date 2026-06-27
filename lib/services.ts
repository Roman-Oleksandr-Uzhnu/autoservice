let services = [
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

let nextId = 9;

export { services };

export function getServiceById(id: number | string) {
  return services.find((service) => service.id === Number(id));
}

export function getCategories() {
  return ["Всі", ...new Set(services.map((service) => service.category))];
}

export function addService(data: any) {
  const newService = {
    id: nextId++,
    name: data.name,
    description: data.description || "",
    price: Number(data.price),
    icon: data.icon || "🔧",
    category: data.category || "Інше",
    available:
      data.available !== undefined ? data.available : true,
  };

  services.push(newService);
  return newService;
}

export function updateService(id: number | string, data: any) {
  const index = services.findIndex(
    (service) => service.id === Number(id)
  );

  if (index === -1) return null;

  services[index] = {
    ...services[index],
    ...data,
    id: services[index].id,
  };

  return services[index];
}

export function deleteService(id: number | string) {
  const index = services.findIndex(
    (service) => service.id === Number(id)
  );

  if (index === -1) return null;

  const deleted = services[index];
  services.splice(index, 1);

  return deleted;
}