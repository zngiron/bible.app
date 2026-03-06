import Link from 'next/link';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getNextBook, getPreviousBook } from '@/data/static/books';

interface VerseNavProps {
  bookSlug: string;
  chapter: number;
  verse: number;
  chapterCount: number;
  totalVersesInChapter: number;
}

function getPreviousHref(bookSlug: string, chapter: number, verse: number) {
  if (verse > 1) return `/${bookSlug}/${chapter}/${verse - 1}`;
  if (chapter > 1) return `/${bookSlug}/${chapter - 1}/1`;

  const prevBook = getPreviousBook(bookSlug);
  if (prevBook) return `/${prevBook.slug}/${prevBook.chapterCount}/1`;

  return undefined;
}

function getNextHref(
  bookSlug: string,
  chapter: number,
  verse: number,
  chapterCount: number,
  totalVersesInChapter: number,
) {
  if (verse < totalVersesInChapter) return `/${bookSlug}/${chapter}/${verse + 1}`;
  if (chapter < chapterCount) return `/${bookSlug}/${chapter + 1}/1`;

  const nextBook = getNextBook(bookSlug);
  if (nextBook) return `/${nextBook.slug}/1/1`;

  return undefined;
}

export function VerseNav({ bookSlug, chapter, verse, chapterCount, totalVersesInChapter }: VerseNavProps) {
  const previousHref = getPreviousHref(bookSlug, chapter, verse);
  const nextHref = getNextHref(bookSlug, chapter, verse, chapterCount, totalVersesInChapter);

  return (
    <>
      {previousHref && (
        <Link
          href={previousHref}
          className={cn(
            'absolute left-4 top-1/2 -translate-y-1/2 z-30',
            'flex items-center justify-center size-9 rounded-full',
            'bg-vintage-paper/90 text-vintage-ink shadow-lg',
            'hover:bg-vintage-paper',
          )}
          aria-label="Previous verse"
        >
          <ChevronLeft
            className="size-4"
            aria-hidden="true"
          />
        </Link>
      )}

      {nextHref && (
        <Link
          href={nextHref}
          className={cn(
            'absolute right-4 top-1/2 -translate-y-1/2 z-30',
            'flex items-center justify-center size-9 rounded-full',
            'bg-vintage-paper/90 text-vintage-ink shadow-lg',
            'hover:bg-vintage-paper',
          )}
          aria-label="Next verse"
        >
          <ChevronRight
            className="size-4"
            aria-hidden="true"
          />
        </Link>
      )}
    </>
  );
}
