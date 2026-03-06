'use client';

import { useRef, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

import { CardVerse } from '@/components/common/card/card-verse';
import { SkeletonCard } from '@/components/common/card/skeleton-card';
import { ChapterNav } from '@/components/common/nav/chapter-nav';

import { cn } from '@/lib/utils';

import { getChapterVerses } from '@/data/api/bible';

interface GridVerseSpatialProps {
  bookSlug: string;
  bookName: string;
  chapterCount: number;
}

export function GridVerseSpatial({ bookSlug, bookName, chapterCount }: GridVerseSpatialProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['bible', 'chapter', bookName, selectedChapter],
    queryFn: () => getChapterVerses(bookName, selectedChapter),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
  });

  const verses = data?.verses ?? [];

  return (
    <div
      ref={containerRef}
      className="relative size-full overflow-hidden"
    >
      <ChapterNav
        loadedChapters={selectedChapter}
        chapterCount={chapterCount}
        onChapterSelect={setSelectedChapter}
      />

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
        {verses.map((verse, index) => (
          <CardVerse
            key={`${verse.chapter}-${verse.verse}`}
            bookSlug={bookSlug}
            bookName={bookName}
            chapter={verse.chapter}
            verse={verse.verse}
            text={verse.text}
            index={index}
          />
        ))}
        {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${String(i)}`} />)}
      </motion.div>

      <div
        className={cn(
          'pointer-events-none absolute inset-0 z-10',
          'bg-linear-to-t from-background/60 via-transparent to-background/30',
        )}
      />

      {verses.length === 0 && isLoading && (
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
