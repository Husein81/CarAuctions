import { Shad, Skeleton } from "./ui";

const SkeletonList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4">
          <Skeleton key={index} className="h-18 w-full" />
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-4 w-1/2 mt-1" />
        </div>
      ))}
    </div>
  );
};
export default SkeletonList;
