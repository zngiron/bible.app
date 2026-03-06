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
        className="absolute top-2 left-2 size-6 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute top-2 right-2 size-6 rotate-90 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute bottom-2 left-2 size-6 -rotate-90 text-vintage-gold/60"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <title>Ornament</title>
        <path d="M2 2 C2 12, 2 12, 12 12 M2 2 C12 2, 12 2, 12 12" />
      </svg>
      <svg
        className="absolute right-2 bottom-2 size-6 rotate-180 text-vintage-gold/60"
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
