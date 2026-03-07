'use client';

import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';

import { CardVerse } from '@/components/common/card/card-verse';
import { SkeletonCard } from '@/components/common/card/skeleton-card';
import { ListVerse } from '@/components/common/grid/list-verse';
import { ScatteredCard } from '@/components/common/grid/scattered-card';

import { cn } from '@/lib/utils';

import { useSpatialDrag } from '@/hooks/useSpatialDrag.hook';
import { getChapterVerses } from '@/data/api/bible';
import { useLayoutStore } from '@/data/stores/layout.store';

interface GridVerseSpatialProps {
  bookSlug: string;
  bookName: string;
  chapterCount: number;
}

export function GridVerseSpatial({ bookSlug, bookName, chapterCount }: GridVerseSpatialProps) {
  const { containerRef, dragProps, cursorClassName } = useSpatialDrag();
  const [selectedChapter] = useState(1);
  const viewMode = useLayoutStore((state) => state.viewMode);
  const setCurrentBook = useLayoutStore((state) => state.setCurrentBook);
  const setCurrentChapter = useLayoutStore((state) => state.setCurrentChapter);

  useEffect(() => {
    setCurrentBook(bookSlug, chapterCount);
    setCurrentChapter(selectedChapter);
  }, [bookSlug, chapterCount, selectedChapter, setCurrentBook, setCurrentChapter]);

  useEffect(() => {
    return () => {
      useLayoutStore.setState({ currentBookSlug: null, currentChapter: null, currentChapterCount: null });
    };
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ['bible', 'chapter', bookName, selectedChapter],
    queryFn: () => getChapterVerses(bookName, selectedChapter),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
  });

  const verses = data?.verses ?? [];

  if (viewMode === 'list') {
    return (
      <ListVerse
        bookSlug={bookSlug}
        bookName={bookName}
        chapterCount={chapterCount}
      />
    );
  }

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
        {verses.map((verse, index) => (
          <ScatteredCard
            key={`${verse.chapter}-${verse.verse}`}
            index={index}
          >
            <CardVerse
              bookSlug={bookSlug}
              bookName={bookName}
              chapter={verse.chapter}
              verse={verse.verse}
              text={verse.text}
              index={index}
              animated={false}
            />
          </ScatteredCard>
        ))}
        {isLoading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={`skeleton-${String(i)}`} />)}
      </motion.div>

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
