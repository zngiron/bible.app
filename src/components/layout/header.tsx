import Link from 'next/link';

import { BreadcrumbNav } from '@/components/common/nav/breadcrumb-nav';

import { cn } from '@/lib/utils';

export function Header() {
  return (
    <header
      className={cn(
        'sticky top-0 z-50',
        'flex items-center justify-between h-14 px-4',
        'bg-background/80 backdrop-blur-sm',
        'border-b border-border/50',
      )}
    >
      <Link
        href="/"
        className={cn('text-sm font-serif font-medium', 'text-foreground')}
      >
        Bible Cards
      </Link>
      <BreadcrumbNav />
    </header>
  );
}
