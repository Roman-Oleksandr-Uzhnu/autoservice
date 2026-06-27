const clients = [
  {
    id: 1,
    name: "Іван Петренко",
    phone: "+380 67 123 45 67",
    car: "Volkswagen Golf",
    visits: 5,
  },
  {
    id: 2,
    name: "Олександр Коваль",
    phone: "+380 50 987 65 43",
    car: "BMW X5",
    visits: 2,
  },
  {
    id: 3,
    name: "Марія Шевченко",
    phone: "+380 63 555 44 33",
    car: "Toyota Corolla",
    visits: 8,
  },
  {
    id: 4,
    name: "Андрій Бондар",
    phone: "+380 96 777 88 99",
    car: "Audi A6",
    visits: 4,
  },
];

export default function ClientsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Клієнти
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">ПІБ</th>
              <th className="px-6 py-4 text-left">Телефон</th>
              <th className="px-6 py-4 text-left">Автомобіль</th>
              <th className="px-6 py-4 text-left">Візитів</th>
            </tr>
          </thead>

          <tbody>
            {clients.map((client) => (
              <tr
                key={client.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">{client.id}</td>

                <td className="px-6 py-4 font-semibold text-gray-900">
                  {client.name}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {client.phone}
                </td>

                <td className="px-6 py-4 text-gray-700">
                  {client.car}
                </td>

                <td className="px-6 py-4">
                  {client.visits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}