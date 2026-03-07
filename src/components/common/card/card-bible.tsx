import type { ReactNode } from 'react';

import { OrnamentBorder } from '@/components/common/card/ornament-border';

import { cn } from '@/lib/utils';

interface CardBibleProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export function CardBible({ children, className, contentClassName }: CardBibleProps) {
  return (
    <div
      className={cn(
        'relative',
        'aspect-5/7 w-full overflow-hidden rounded-2xl',
        'bg-vintage-paper shadow-[0_8px_32px_var(--vintage-shadow)]',
        'font-serif',
        className,
      )}
    >
      <div className={cn('absolute inset-2 rounded-xl', 'border-2 border-vintage-gold/60')} />
      <OrnamentBorder />
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-0 z-20 rounded-2xl',
          'opacity-[0.12] mix-blend-multiply',
          'texture-grain',
        )}
      />
      <div
        className={cn('relative z-30 flex flex-col items-center justify-center size-full p-5 sm:p-8', contentClassName)}
      >
        {children}
      </div>
    </div>
  );
}
