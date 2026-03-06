'use client';

import type { BibleBook } from '@/data/static/books';

import Link from 'next/link';

import { motion } from 'motion/react';

import { CardBible } from '@/components/common/card/card-bible';

import { springSnappy } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

interface CardBookProps {
  book: BibleBook;
  index: number;
}

export function CardBook({ book, index }: CardBookProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, ...springSnappy }}
      whileHover={{ scale: 1.04 }}
    >
      <Link
        href={`/${book.slug}`}
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
            {book.order}
          </span>
          <p className={cn('text-center text-lg font-medium', 'text-vintage-ink')}>{book.name}</p>
          <p className={cn('mt-1 text-center text-xs', 'text-vintage-ink/50 font-sans')}>
            {book.chapterCount} {book.chapterCount === 1 ? 'chapter' : 'chapters'}
          </p>
        </CardBible>
      </Link>
    </motion.div>
  );
}
