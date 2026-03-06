import type { ReactNode } from 'react';

import { OrnamentBorder } from '@/components/common/card/ornament-border';

import { cn } from '@/lib/utils';

interface CardBibleProps {
  children: ReactNode;
  className?: string;
}

export function CardBible({ children, className }: CardBibleProps) {
  return (
    <div
      className={cn(
        'relative',
        'aspect-[9/16] w-full overflow-hidden rounded-2xl',
        'bg-vintage-paper shadow-[0_8px_32px_var(--vintage-shadow)]',
        'font-serif',
        className,
      )}
    >
      <div className={cn('absolute inset-1.5 rounded-xl', 'border border-vintage-border/40')} />
      <OrnamentBorder />
      <div className="relative flex flex-col items-center justify-center size-full p-6">{children}</div>
    </div>
  );
}
