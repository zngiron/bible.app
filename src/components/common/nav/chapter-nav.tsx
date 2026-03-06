'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ChapterNavProps {
  loadedChapters: number;
  chapterCount: number;
  onChapterSelect?: (chapter: number) => void;
  bookSlug?: string;
}

export function ChapterNav({ loadedChapters, chapterCount, onChapterSelect, bookSlug }: ChapterNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div
      ref={navRef}
      className="absolute top-4 right-4 z-30"
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 rounded-full px-4 py-2',
          'bg-vintage-paper/90 text-vintage-ink shadow-lg',
          'text-sm font-serif font-medium',
          'hover:bg-vintage-paper',
        )}
      >
        Chapter {loadedChapters}
        <ChevronDown
          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute top-full right-0 mt-2 w-56',
            'rounded-xl bg-vintage-paper/95 shadow-xl',
            'max-h-72 overflow-y-auto',
            '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vintage-border/40',
          )}
        >
          <div className="p-2">
            {Array.from({ length: chapterCount }, (_, i) => i + 1).map((chapter) => {
              const isActive = chapter === loadedChapters;
              const itemStyles = cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2',
                'text-left text-sm font-sans',
                isActive
                  ? 'bg-vintage-gold/15 text-vintage-ink font-medium'
                  : 'text-vintage-ink/60 hover:bg-vintage-gold/10 hover:text-vintage-ink',
              );
              const badge = (
                <span
                  className={cn(
                    'flex items-center justify-center size-6 rounded-full',
                    'text-xs',
                    isActive ? 'bg-vintage-gold/30 text-vintage-ink' : 'bg-vintage-border/20 text-vintage-ink/40',
                  )}
                >
                  {chapter}
                </span>
              );

              if (bookSlug) {
                return (
                  <Link
                    key={chapter}
                    href={`/${bookSlug}/${chapter}/1`}
                    className={itemStyles}
                    onClick={() => setIsOpen(false)}
                  >
                    {badge}
                    Chapter {chapter}
                  </Link>
                );
              }

              return (
                <button
                  key={chapter}
                  type="button"
                  onClick={() => {
                    onChapterSelect?.(chapter);
                    setIsOpen(false);
                  }}
                  className={itemStyles}
                >
                  {badge}
                  Chapter {chapter}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
