import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div className={cn('aspect-[9/16] w-full rounded-2xl bg-vintage-paper/20', className)}>
      <div className="flex flex-col items-center justify-center gap-3 size-full p-6">
        <Skeleton className="h-4 w-16 bg-vintage-paper/30" />
        <Skeleton className="h-3 w-24 bg-vintage-paper/20" />
      </div>
    </div>
  );
}
