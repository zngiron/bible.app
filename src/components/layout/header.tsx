import Link from 'next/link';

import { BreadcrumbNav } from '@/components/common/nav/breadcrumb-nav';

import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header
      className={cn(
        'shrink-0 z-50',
        'flex items-center gap-2 h-14 px-4',
        'bg-background/80 backdrop-blur-sm',
        'border-b border-border/50',
      )}
    >
      <Link
        href="/"
        className={cn('text-sm font-serif font-medium', 'text-foreground')}
      >
        Project Bible
      </Link>
      <BreadcrumbNav />
    </header>
  );
}
