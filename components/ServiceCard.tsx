type ServiceCardProps = {
  name: string;
  description: string;
  price: number;
  icon: string;
  category: string;
  available?: boolean;
};

export default function ServiceCard({
  name,
  description,
  price,
  icon,
  category,
  available = true,
}: ServiceCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 ${
        !available ? "opacity-60" : ""
      }`}
    >
      <div className="h-36 bg-slate-100 flex items-center justify-center">
        <span className="text-6xl">{icon}</span>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-semibold text-gray-900">
            {name}
          </h3>

          {available ? (
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">
              Доступно
            </span>
          ) : (
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">
              Недоступно
            </span>
          )}
        </div>

        <p className="text-gray-600 mb-4">
          {description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-red-600 font-bold text-lg">
            {price} грн
          </span>

          <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}