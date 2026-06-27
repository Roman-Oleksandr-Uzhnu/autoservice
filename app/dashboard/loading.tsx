import { StatSkeleton } from "@/components/skeletons/PostSkeleton";

export default function Loading() {
  return (
    <div>
      <div className="h-10 w-40 bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatSkeleton />
        <StatSkeleton />
        <StatSkeleton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <StatSkeleton />
        <StatSkeleton />
      </div>
    </div>
  );
}