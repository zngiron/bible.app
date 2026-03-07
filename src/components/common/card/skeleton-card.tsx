import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'aspect-5/7 w-full overflow-hidden rounded-2xl',
        'bg-vintage-paper/20 shadow-[0_4px_16px_var(--vintage-shadow)]',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4 size-full p-6">
        <div className="h-7 w-7 rounded-full bg-vintage-gold/15 animate-pulse" />
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="h-3 w-3/4 rounded-full bg-vintage-paper/20 animate-pulse" />
          <div className="h-3 w-1/2 rounded-full bg-vintage-paper/15 animate-pulse" />
          <div className="h-3 w-2/3 rounded-full bg-vintage-paper/15 animate-pulse" />
        </div>
        <div className="h-2.5 w-20 rounded-full bg-vintage-paper/10 animate-pulse" />
      </div>
    </div>
  );
}
