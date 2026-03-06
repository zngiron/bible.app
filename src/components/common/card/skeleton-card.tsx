import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn('aspect-5/7 w-full overflow-hidden rounded-2xl', 'bg-vintage-paper/10', 'animate-pulse', className)}
    >
      <div className="flex flex-col items-center justify-center gap-4 size-full p-6">
        <div className="h-4 w-20 rounded-full bg-vintage-paper/15" />
        <div className="h-3 w-28 rounded-full bg-vintage-paper/10" />
        <div className="h-3 w-16 rounded-full bg-vintage-paper/10" />
      </div>
    </div>
  );
}
