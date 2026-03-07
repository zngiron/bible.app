'use client';

import type { BibleBook } from '@/data/static/books';

import Link from 'next/link';

import { motion } from 'motion/react';

import { BadgeVintage } from '@/components/common/badge/badge-vintage';
import { CardBible } from '@/components/common/card/card-bible';

import { maxStaggerDelay, springSnappy, staggerDelay } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

interface CardBookProps {
  book: BibleBook;
  index: number;
  animated?: boolean;
}

export function CardBook({ book, index, animated = true }: CardBookProps) {
  const content = (
    <Link
      href={`/${book.slug}`}
      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-2xl"
    >
      <CardBible>
        <BadgeVintage className="absolute top-4 right-4">{book.order}</BadgeVintage>
        <p className={cn('text-center text-balance text-lg font-medium', 'text-vintage-ink')}>{book.name}</p>
        <p className={cn('mt-1 text-center text-balance text-xs', 'text-vintage-ink/50 font-sans')}>
          {book.chapterCount} {book.chapterCount === 1 ? 'chapter' : 'chapters'}
        </p>
      </CardBible>
    </Link>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * staggerDelay, maxStaggerDelay), ...springSnappy }}
      whileHover={{ scale: 1.04 }}
    >
      {content}
    </motion.div>
  );
}
