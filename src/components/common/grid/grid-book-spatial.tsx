'use client';

import type { BibleBook } from '@/data/static/books';

import { motion } from 'motion/react';

import { CardBook } from '@/components/common/card/card-book';
import { ScatteredCard } from '@/components/common/grid/scattered-card';

import { cn } from '@/lib/utils';

import { useSpatialDrag } from '@/hooks/useSpatialDrag.hook';

interface GridBookSpatialProps {
  books: readonly BibleBook[];
  offsetIndex?: number;
}

export function GridBookSpatial({ books, offsetIndex = 0 }: GridBookSpatialProps) {
  const { containerRef, dragProps, cursorClassName } = useSpatialDrag();

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden"
    >
      <motion.div
        {...dragProps}
        className={cn(
          'grid gap-4 p-4 sm:gap-6 sm:p-6 md:gap-8 md:p-8',
          '[--card-min:8rem] sm:[--card-min:10rem] md:[--card-min:18rem]',
          cursorClassName,
        )}
        style={{
          touchAction: 'pan-x',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(var(--card-min), 100%), 1fr))',
          minHeight: '150%',
        }}
      >
        {books.map((book, index) => (
          <ScatteredCard
            key={book.id}
            index={index + offsetIndex}
          >
            <CardBook
              book={book}
              index={index + offsetIndex}
              animated={false}
            />
          </ScatteredCard>
        ))}
      </motion.div>
    </div>
  );
}
