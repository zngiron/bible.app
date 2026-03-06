import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer className={cn('flex items-center justify-center h-10 px-4', 'text-xs text-muted-foreground font-sans')}>
      <p>World English Bible (Public Domain)</p>
    </footer>
  );
}
