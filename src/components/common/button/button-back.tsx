import Link from 'next/link';

import { ArrowLeft } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ButtonBackProps {
  href: string;
  label?: string;
}

export function ButtonBack({ href, label = 'Back' }: ButtonBackProps) {
  return (
    <div className="absolute top-4 left-4 z-30">
      <Link
        href={href}
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-2',
          'bg-vintage-paper/90 text-vintage-ink shadow-lg',
          'text-sm font-sans',
          'hover:bg-vintage-paper',
        )}
      >
        <ArrowLeft
          className="size-4"
          aria-hidden="true"
        />
        {label}
      </Link>
    </div>
  );
}
