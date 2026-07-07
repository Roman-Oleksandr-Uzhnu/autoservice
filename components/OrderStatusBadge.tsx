const STATUS_CONFIG = {
  pending: {
    label: "Очікує",
    classes: "bg-yellow-100 text-yellow-800",
  },
  preparing: {
    label: "В роботі",
    classes: "bg-blue-100 text-blue-800",
  },
  ready: {
    label: "Готово",
    classes: "bg-green-100 text-green-800",
  },
  completed: {
    label: "Виконано",
    classes: "bg-gray-200 text-gray-700",
  },
  cancelled: {
    label: "Скасовано",
    classes: "bg-red-100 text-red-700",
  },
};

export default function OrderStatusBadge({
  status,
}: {
  status: string;
}) {
  const cfg = STATUS_CONFIG[
    status as keyof typeof STATUS_CONFIG
  ] || {
    label: status,
    classes: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-semibold ${cfg.classes}`}
    >
      {cfg.label}
    </span>
  );
}