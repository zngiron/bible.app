'use client';

import { motion, useTransform } from 'motion/react';

import { CardBible } from '@/components/common/card/card-bible';

import { cn } from '@/lib/utils';

import { useCardFlip } from '@/hooks/useCardFlip.hook';

interface CardVerseInteractiveProps {
  reference: string;
  text: string;
  imageUrl?: string;
}

export function CardVerseInteractive({ reference, text, imageUrl }: CardVerseInteractiveProps) {
  const { rotateY, handleDragUpdate, handleDragSnap, flipCard } = useCardFlip();

  const frontOpacity = useTransform(rotateY, [-90, -89, 89, 90], [0, 1, 1, 0]);
  const backOpacity = useTransform(rotateY, [-90, -89, 89, 90], [1, 0, 0, 1]);

  return (
    <div
      className="mx-auto w-full max-w-xs"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.5}
        onDrag={(_, info) => handleDragUpdate(info)}
        onDragEnd={() => handleDragSnap()}
        onDoubleClick={flipCard}
        style={{ rotateY, transformStyle: 'preserve-3d' }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        <motion.div style={{ opacity: frontOpacity, backfaceVisibility: 'hidden' }}>
          <CardBible className="bg-vintage-paper">
            {imageUrl ? (
              <div
                className="absolute inset-0 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            ) : (
              <div className={cn('flex flex-col items-center justify-center gap-4 size-full', 'text-vintage-ink/30')}>
                <svg
                  className="size-16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  aria-hidden="true"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <p className="text-sm font-sans">{reference}</p>
              </div>
            )}
          </CardBible>
        </motion.div>

        <motion.div
          style={{ opacity: backOpacity, backfaceVisibility: 'hidden', rotateY: 180 }}
          className="absolute inset-0"
        >
          <CardBible className="bg-vintage-paper">
            <div className="flex flex-col items-center justify-center gap-6 size-full px-2">
              <blockquote className={cn('text-center text-lg leading-relaxed', 'text-vintage-ink')}>
                &ldquo;{text}&rdquo;
              </blockquote>
              <cite className={cn('not-italic text-sm', 'text-vintage-ink/60 font-sans')}>{reference}</cite>
            </div>
          </CardBible>
        </motion.div>
      </motion.div>
    </div>
  );
}
