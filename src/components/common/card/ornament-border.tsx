import { cn } from '@/lib/utils';

interface OrnamentBorderProps {
  className?: string;
  colorClassName?: string;
}

const flourishPath = [
  'M50 10 C42 10 36 5 28 7 C22 9 18 14 12 12',
  'M50 10 C58 10 64 5 72 7 C78 9 82 14 88 12',
  'M12 12 C9 11 8 14 10 15 C12 16 14 14 12 12',
  'M88 12 C91 11 92 14 90 15 C88 16 86 14 88 12',
  'M50 9 C48 5 46 3 50 2 C54 3 52 5 50 9',
  'M34 5 C35 3 37 3 38 5',
  'M62 5 C63 3 65 3 66 5',
].join(' ');

export function OrnamentBorder({ className, colorClassName = 'text-vintage-gold/60' }: OrnamentBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      <svg
        role="presentation"
        className={cn('absolute top-4 left-1/2 -translate-x-1/2 w-3/5', colorClassName)}
        viewBox="0 0 100 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={flourishPath} />
        <circle
          cx="50"
          cy="11"
          r="1.2"
          fill="currentColor"
          stroke="none"
        />
      </svg>
      <svg
        role="presentation"
        className={cn('absolute bottom-4 left-1/2 -translate-x-1/2 w-3/5 -scale-y-100', colorClassName)}
        viewBox="0 0 100 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d={flourishPath} />
        <circle
          cx="50"
          cy="11"
          r="1.2"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    </div>
  );
}
