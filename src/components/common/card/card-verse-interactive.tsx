'use client';

import { useCallback, useRef, useState } from 'react';

import { X } from 'lucide-react';
import { AnimatePresence, motion, useTransform } from 'motion/react';

import { CardBible } from '@/components/common/card/card-bible';

import { cn } from '@/lib/utils';

import { useCardFlip } from '@/hooks/useCardFlip.hook';
import { useCardTilt } from '@/hooks/useCardTilt.hook';

interface CardVerseInteractiveProps {
  reference: string;
  text: string;
  imageUrl?: string;
}

export function CardVerseInteractive({ reference, text, imageUrl }: CardVerseInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { rotateY, isFlipped, handleDragUpdate, handleDragSnap, flipCard } = useCardFlip();
  const { tiltX, tiltY, handlePointerMove, handlePointerLeave } = useCardTilt(containerRef);
  const [isExpanded, setIsExpanded] = useState(false);

  const combinedRotateY = useTransform([rotateY, tiltY], ([flip, tilt]) => (flip as number) + (tilt as number));
  const frontOpacity = useTransform(rotateY, [-90, -89, 89, 90], [0, 1, 1, 0]);
  const backOpacity = useTransform(rotateY, [-90, -89, 89, 90], [1, 0, 0, 1]);

  const handleClick = useCallback(() => {
    setIsExpanded(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsExpanded(false);
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="mx-auto w-full max-w-[260px] sm:max-w-sm"
        style={{ perspective: '1200px' }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0}
          onDrag={(_, info) => handleDragUpdate(info)}
          onDragEnd={() => handleDragSnap()}
          onDoubleClick={flipCard}
          onClick={handleClick}
          style={{ rotateX: tiltX, rotateY: combinedRotateY, transformStyle: 'preserve-3d' }}
          className="relative cursor-grab active:cursor-grabbing"
        >
          <motion.div style={{ opacity: frontOpacity, backfaceVisibility: 'hidden' }}>
            <CardBible className="bg-vintage-paper">
              {imageUrl ? (
                <div
                  className="absolute inset-3 z-10 rounded-lg bg-cover bg-center"
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

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'fixed inset-0 z-50',
              'flex flex-col items-center justify-center',
              'bg-background/95 backdrop-blur-md',
            )}
            role="dialog"
            aria-modal="true"
            aria-label={reference}
          >
            <button
              type="button"
              onClick={handleClose}
              className={cn(
                'absolute top-4 right-4',
                'flex items-center justify-center size-10 rounded-full',
                'bg-vintage-paper/90 text-vintage-ink shadow-lg',
                'hover:bg-vintage-paper',
              )}
              aria-label="Close"
            >
              <X
                className="size-5"
                aria-hidden="true"
              />
            </button>

            {isFlipped ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                className="flex flex-col items-center gap-8 px-8 max-w-lg"
              >
                <blockquote className={cn('text-center text-2xl leading-relaxed font-serif', 'text-foreground')}>
                  &ldquo;{text}&rdquo;
                </blockquote>
                <cite className={cn('not-italic text-base font-sans', 'text-muted-foreground')}>{reference}</cite>
              </motion.div>
            ) : imageUrl ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                className="size-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
                className="flex flex-col items-center gap-6 px-8"
              >
                <svg
                  className="size-32 text-foreground/20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  aria-hidden="true"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <p className={cn('text-lg font-serif', 'text-muted-foreground')}>{reference}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
