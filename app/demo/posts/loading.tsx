export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="h-10 w-72 bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow p-6"
          >
            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>

            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>

            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse mt-6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}