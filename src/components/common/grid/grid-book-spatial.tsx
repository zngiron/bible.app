'use client';

import type { BibleBook } from '@/data/static/books';

import { useRef, useState } from 'react';

import { motion } from 'motion/react';

import { CardBook } from '@/components/common/card/card-book';

import { cn } from '@/lib/utils';

interface GridBookSpatialProps {
  books: readonly BibleBook[];
  offsetIndex?: number;
}

export function GridBookSpatial({ books, offsetIndex = 0 }: GridBookSpatialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden"
    >
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0.1}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        className={cn('inline-grid gap-8 p-8', isDragging ? 'cursor-grabbing' : 'cursor-grab')}
        style={{
          touchAction: 'none',
          minWidth: '200%',
          minHeight: '200%',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {books.map((book, index) => (
          <CardBook
            key={book.id}
            book={book}
            index={index + offsetIndex}
          />
        ))}
      </motion.div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10',
          'bg-linear-to-t from-background/60 via-transparent to-background/30',
        )}
      />
    </div>
  );
}
