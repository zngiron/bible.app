import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className={cn('flex flex-col items-center justify-center min-h-[50dvh] gap-4 px-6', 'text-center')}>
      <h1 className="text-2xl font-bold text-foreground">Book not found</h1>
      <p className={cn('max-w-md', 'text-muted-foreground')}>
        The book you are looking for does not exist in the Bible.
      </p>
      <Button asChild>
        <Link href="/">Browse all books</Link>
      </Button>
    </div>
  );
}
