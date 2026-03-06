'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { logger } from '@/lib/logger';
import { cn } from '@/lib/utils';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error({ context: 'book-error-boundary' }, error.message);
  }, [error]);

  return (
    <div
      role="alert"
      className={cn('flex flex-col items-center justify-center min-h-[50dvh] gap-4 px-6', 'text-center')}
    >
      <h1 className="text-2xl font-bold text-foreground">Failed to load book</h1>
      <p className={cn('max-w-md', 'text-muted-foreground')}>Could not load the verses. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
