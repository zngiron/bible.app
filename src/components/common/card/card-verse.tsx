'use client';

import Link from 'next/link';

import { motion } from 'motion/react';

import { CardBible } from '@/components/common/card/card-bible';

import { springSnappy } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

interface CardVerseProps {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  index: number;
}

export function CardVerse({ bookId, bookName, chapter, verse, text, index }: CardVerseProps) {
  const truncatedText = text.length > 80 ? `${text.slice(0, 80)}...` : text;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * 0.015, 0.5), ...springSnappy }}
      whileHover={{ scale: 1.04, rotate: 0, zIndex: 10 }}
      style={{ rotate: (index % 2 === 0 ? -1.5 : 1.5) * (1 + (index % 2)) }}
      className="relative"
    >
      <Link
        href={`/${bookId}/${chapter}/${verse}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-2xl"
      >
        <CardBible>
          <span
            className={cn(
              'absolute top-3 right-3',
              'flex items-center justify-center size-7 rounded-full',
              'bg-vintage-gold/20 text-vintage-ink/60',
              'text-xs font-sans',
            )}
          >
            {chapter}:{verse}
          </span>
          <p className={cn('text-center text-sm leading-relaxed', 'text-vintage-ink/80')}>{truncatedText}</p>
          <p className={cn('mt-3 text-center text-xs', 'text-vintage-ink/40 font-sans')}>
            {bookName} {chapter}:{verse}
          </p>
        </CardBible>
      </Link>
    </motion.div>
  );
}
