'use client';

import type { BibleVerse } from '@/data/api/bible';

import { useRef, useState } from 'react';

import { useQueries } from '@tanstack/react-query';
import { motion } from 'motion/react';

import { CardVerse } from '@/components/common/card/card-verse';
import { SkeletonCard } from '@/components/common/card/skeleton-card';

import { cn } from '@/lib/utils';

import { getChapterVerses } from '@/data/api/bible';

interface GridVerseSpatialProps {
  bookId: string;
  bookName: string;
  chapterCount: number;
}

export function GridVerseSpatial({ bookId, bookName, chapterCount }: GridVerseSpatialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loadedChapters, setLoadedChapters] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const chapters = Array.from({ length: loadedChapters }, (_, i) => i + 1);

  const chapterQueries = useQueries({
    queries: chapters.map((chapter) => ({
      queryKey: ['bible', 'chapter', bookName, chapter],
      queryFn: () => getChapterVerses(bookName, chapter),
      staleTime: Number.POSITIVE_INFINITY,
      gcTime: 1000 * 60 * 60,
    })),
  });

  const allVerses: BibleVerse[] = [];
  for (const query of chapterQueries) {
    if (query.data) {
      for (const verse of query.data.verses) {
        allVerses.push(verse);
      }
    }
  }

  const isLoadingMore = chapterQueries.some((q) => q.isLoading);
  const hasMoreChapters = loadedChapters < chapterCount;

  function handleLoadMore() {
    if (hasMoreChapters && !isLoadingMore) {
      setLoadedChapters((prev) => Math.min(prev + 3, chapterCount));
    }
  }

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
        className={cn(
          'inline-grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5 md:gap-6',
          isDragging ? 'cursor-grabbing' : 'cursor-grab',
        )}
        style={{ touchAction: 'none', minWidth: '120%', minHeight: '120%' }}
      >
        {allVerses.map((verse, index) => (
          <CardVerse
            key={`${verse.chapter}-${verse.verse}`}
            bookId={bookId}
            bookName={bookName}
            chapter={verse.chapter}
            verse={verse.verse}
            text={verse.text}
            index={index}
          />
        ))}
        {isLoadingMore && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${String(i)}`} />)}
      </motion.div>

      {hasMoreChapters && !isLoadingMore && (
        <div className="absolute right-4 bottom-4 z-20">
          <button
            type="button"
            onClick={handleLoadMore}
            className={cn(
              'rounded-full px-4 py-2',
              'bg-vintage-paper/90 text-vintage-ink',
              'text-sm font-sans shadow-lg',
              'hover:bg-vintage-paper',
            )}
          >
            Load more chapters
          </button>
        </div>
      )}

      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10',
          'bg-gradient-to-t from-background/60 via-transparent to-background/30',
        )}
      />

      {allVerses.length === 0 && isLoadingMore && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div
            className={cn(
              'rounded-full px-6 py-3',
              'bg-vintage-paper/90 text-vintage-ink',
              'text-sm font-sans shadow-lg',
            )}
          >
            Loading verses...
          </div>
        </div>
      )}
    </div>
  );
}
