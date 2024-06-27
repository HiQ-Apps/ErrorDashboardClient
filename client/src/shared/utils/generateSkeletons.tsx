import { Skeleton } from "components/ui/skeleton";

interface SkeletonProps {
  count: number;
}

export const GenerateSkeletons = ({ count }: SkeletonProps) => {
  return (
    <div>
      {[...Array(count)].map((_) => (
        <Skeleton className="w-[300px] h-4 m-4" />
      ))}
    </div>
  );
};
