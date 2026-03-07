'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { BadgeVintage } from '@/components/common/badge/badge-vintage';

import { springSnappy } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

import { getChapterVerses } from '@/data/api/bible';

interface ListVerseProps {
  bookSlug: string;
  bookName: string;
  chapterCount: number;
}

export function ListVerse({ bookSlug, bookName, chapterCount }: ListVerseProps) {
  const [expandedChapter, setExpandedChapter] = useState(1);

  return (
    <div className="flex flex-col overflow-y-auto h-full px-4 py-4">
      {Array.from({ length: chapterCount }, (_, i) => i + 1).map((chapter) => (
        <ChapterAccordion
          key={chapter}
          bookSlug={bookSlug}
          bookName={bookName}
          chapter={chapter}
          isExpanded={expandedChapter === chapter}
          onToggle={() => setExpandedChapter(expandedChapter === chapter ? 0 : chapter)}
        />
      ))}
    </div>
  );
}

interface ChapterAccordionProps {
  bookSlug: string;
  bookName: string;
  chapter: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function ChapterAccordion({ bookSlug, bookName, chapter, isExpanded, onToggle }: ChapterAccordionProps) {
  const { data, isLoading } = useQuery({
    queryKey: ['bible', 'chapter', bookName, chapter],
    queryFn: () => getChapterVerses(bookName, chapter),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
    enabled: isExpanded,
  });

  const verses = data?.verses ?? [];

  return (
    <div className="border-b border-border/20">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          'flex items-center justify-between w-full py-3 px-2',
          'text-left',
          'hover:bg-secondary/10 rounded-lg',
        )}
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-serif font-medium text-foreground">Chapter {chapter}</span>
        <ChevronDown
          className={cn('size-4 text-muted-foreground transition-transform', isExpanded && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={springSnappy}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2">
              {isLoading && <p className="py-4 text-sm text-muted-foreground">Loading...</p>}
              {verses.map((verse) => (
                <Link
                  key={`${verse.chapter}-${verse.verse}`}
                  href={`/${bookSlug}/${verse.chapter}/${verse.verse}`}
                  className={cn('flex gap-3 py-2.5 px-2', 'hover:bg-secondary/10 rounded-lg')}
                >
                  <BadgeVintage size="sm">{verse.verse}</BadgeVintage>
                  <p className="text-sm leading-relaxed font-serif text-foreground line-clamp-2">{verse.text}</p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
