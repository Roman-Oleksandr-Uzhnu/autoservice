export function PostSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>

      <div className="h-3 bg-gray-200 rounded w-28 mt-5"></div>
    </div>
  );
}

export function StatSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>

      <div className="h-10 bg-gray-200 rounded w-20"></div>
    </div>
  );
}

type TableSkeletonProps = {
  rows?: number;
};

export function TableSkeleton({
  rows = 5,
}: TableSkeletonProps) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            {[...Array(5)].map((_, i) => (
              <th key={i} className="px-6 py-4">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(rows)].map((_, row) => (
            <tr key={row} className="border-t">
              {[...Array(5)].map((_, col) => (
                <td key={col} className="px-6 py-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}