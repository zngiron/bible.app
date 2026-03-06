import type { Metadata } from 'next';

import Link from 'next/link';

import { CardBible } from '@/components/common/card/card-bible';

import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Books of the Bible',
  description: 'Explore all 66 books of the Bible as beautifully designed vintage trading cards.',
};

export default function Page(_: PageProps<'/'>) {
  return (
    <div className={cn('grid h-full grid-rows-2', 'lg:grid-cols-2 lg:grid-rows-1')}>
      <Link
        href="/old"
        className={cn(
          'group relative',
          'flex items-center justify-center',
          'border-b border-border/30 lg:border-r lg:border-b-0',
          'transition-colors hover:bg-secondary/20',
        )}
      >
        <div className="w-full max-w-[200px] p-4 sm:max-w-[280px] sm:p-8">
          <CardBible>
            <p className={cn('text-center text-xl font-medium', 'text-vintage-ink')}>Old Testament</p>
            <p className={cn('mt-2 text-center text-xs', 'text-vintage-ink/50 font-sans')}>39 Books</p>
          </CardBible>
        </div>
      </Link>

      <Link
        href="/new"
        className={cn('group relative', 'flex items-center justify-center', 'transition-colors hover:bg-secondary/20')}
      >
        <div className="w-full max-w-[200px] p-4 sm:max-w-[280px] sm:p-8">
          <CardBible>
            <p className={cn('text-center text-xl font-medium', 'text-vintage-ink')}>New Testament</p>
            <p className={cn('mt-2 text-center text-xs', 'text-vintage-ink/50 font-sans')}>27 Books</p>
          </CardBible>
        </div>
      </Link>
    </div>
  );
}
