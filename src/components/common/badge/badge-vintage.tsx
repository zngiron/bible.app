import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface BadgeVintageProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeStyles = {
  sm: 'size-6 text-xs bg-background/60 text-vintage-paper',
  md: 'size-7 text-xs bg-background/80 text-vintage-paper',
  lg: 'size-8 text-xs bg-background/80 text-vintage-paper',
} as const;

export function BadgeVintage({ children, size = 'md', className }: BadgeVintageProps) {
  return (
    <span
      className={cn(
        'flex items-center justify-center rounded-full',
        'ring-1 ring-background/40',
        'font-semibold font-sans',
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
