type StatsCardProps = {
  title: string;
  value: string | number;
  color?: "red" | "green" | "blue";
};

const colors = {
  red: "text-red-600",
  green: "text-green-600",
  blue: "text-blue-600",
};

export default function StatsCard({
  title,
  value,
  color = "red",
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h3 className="text-gray-500 text-sm font-bold">
        {title}
      </h3>

      <p
        className={`text-4xl font-bold mt-2 ${colors[color]}`}
      >
        {value}
      </p>
    </div>
  );
}