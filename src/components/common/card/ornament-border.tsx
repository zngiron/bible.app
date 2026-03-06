import { cn } from '@/lib/utils';

interface OrnamentBorderProps {
  className?: string;
}

export function OrnamentBorder({ className }: OrnamentBorderProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      <svg
        className="absolute top-1.5 left-1.5 size-5 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute top-1.5 right-1.5 size-5 rotate-90 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute bottom-1.5 left-1.5 size-5 -rotate-90 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute right-1.5 bottom-1.5 size-5 rotate-180 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
    </div>
  );
}
