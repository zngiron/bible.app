'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getBookById } from '@/data/static/books';

export function BreadcrumbNav() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs: { label: string; href: string }[] = [{ label: 'Books', href: '/' }];

  if (segments[0]) {
    const bookData = getBookById(segments[0]);
    const bookName = bookData?.name ?? segments[0];
    crumbs.push({ label: bookName, href: `/${segments[0]}` });

    if (segments[1] && segments[2]) {
      crumbs.push({
        label: `${segments[1]}:${segments[2]}`,
        href: `/${segments[0]}/${segments[1]}/${segments[2]}`,
      });
    }
  }

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-sm font-sans">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li
              key={crumb.href}
              className="flex items-center gap-1.5"
            >
              {index > 0 && (
                <ChevronRight
                  className="size-3 text-muted-foreground/50"
                  aria-hidden="true"
                />
              )}
              {isLast ? (
                <span
                  className="text-foreground"
                  aria-current="page"
                >
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn('text-muted-foreground', 'hover:text-foreground')}
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
