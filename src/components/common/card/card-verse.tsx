'use client';

import Link from 'next/link';

import { motion } from 'motion/react';

import { BadgeVintage } from '@/components/common/badge/badge-vintage';
import { CardBible } from '@/components/common/card/card-bible';

import { maxStaggerDelay, springSnappy, staggerDelay } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

interface CardVerseProps {
  bookSlug: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  index: number;
  animated?: boolean;
}

export function CardVerse({ bookSlug, bookName, chapter, verse, text, index, animated = true }: CardVerseProps) {
  const content = (
    <Link
      href={`/${bookSlug}/${chapter}/${verse}`}
      className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring rounded-2xl"
    >
      <CardBible>
        <BadgeVintage className="absolute top-4 right-4">
          {chapter}:{verse}
        </BadgeVintage>
        <p className={cn('text-center text-pretty text-sm leading-relaxed line-clamp-5', 'text-vintage-ink/80')}>
          {text}
        </p>
        <p className={cn('mt-3 text-center text-balance text-xs', 'text-vintage-ink/40 font-sans')}>
          {bookName} {chapter}:{verse}
        </p>
      </CardBible>
    </Link>
  );

  if (!animated) return content;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * staggerDelay, maxStaggerDelay), ...springSnappy }}
      whileHover={{ scale: 1.04, zIndex: 10 }}
      className="relative"
    >
      {content}
    </motion.div>
  );
}
