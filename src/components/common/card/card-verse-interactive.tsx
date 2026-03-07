'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';

import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

import { BadgeVintage } from '@/components/common/badge/badge-vintage';
import { OrnamentBorder } from '@/components/common/card/ornament-border';

import { cn } from '@/lib/utils';

interface CardVerseInteractiveProps {
  reference: string;
  text: string;
  imageUrl?: string;
}

const springConfig = { stiffness: 300, damping: 30 };

export function CardVerseInteractive({ reference, text, imageUrl }: CardVerseInteractiveProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const baseRotation = useRef(0);
  const isDragging = useRef(false);

  const rawRotateY = useMotionValue(0);
  const rotateY = useSpring(rawRotateY, springConfig);
  const hoverTiltY = useSpring(0, springConfig);
  const combinedRotateY = useTransform(() => rotateY.get() + hoverTiltY.get());
  const rotateX = useSpring(0, springConfig);

  const chapterVerse = reference.split(' ').pop();

  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      isDragging.current = true;
      dragStartX.current = event.clientX;
      baseRotation.current = rawRotateY.get();
      hoverTiltY.set(0);
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    },
    [rawRotateY, hoverTiltY],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

      if (isDragging.current) {
        const dx = event.clientX - dragStartX.current;
        const sensitivity = 0.6;
        rawRotateY.set(baseRotation.current + dx * sensitivity);
        rotateX.set(-normalizedY * 10);
      } else {
        rotateX.set(-normalizedY * 15);
        hoverTiltY.set(normalizedX * 15);
      }
    },
    [rawRotateY, rotateX, hoverTiltY],
  );

  const handlePointerUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const current = rawRotateY.get();
    const normalized = ((current % 360) + 360) % 360;
    const snapTo = normalized > 90 && normalized < 270 ? 180 : 0;

    const fullTurns = Math.round(current / 360) * 360;
    rawRotateY.set(fullTurns + snapTo);
  }, [rawRotateY]);

  const handlePointerLeave = useCallback(() => {
    if (!isDragging.current) {
      rotateX.set(0);
      hoverTiltY.set(0);
    }
  }, [rotateX, hoverTiltY]);

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-xs sm:max-w-md touch-none"
      style={{ perspective: '1200px' }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerUp}
    >
      <motion.div
        style={{
          rotateX,
          rotateY: combinedRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative cursor-grab active:cursor-grabbing"
      >
        {/* Front face */}
        <div
          className={cn(
            'relative',
            'aspect-5/7 w-full overflow-hidden rounded-2xl',
            'bg-vintage-paper shadow-[0_8px_32px_var(--vintage-shadow)]',
            'font-serif',
          )}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={cn('absolute inset-2 rounded-xl', 'border-2 border-vintage-gold/60')} />
          <OrnamentBorder />
          <div
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 z-20 rounded-2xl', 'opacity-[0.12]', 'texture-grain')}
          />
          <div className="relative z-30 flex flex-col items-center justify-center gap-6 size-full p-8 sm:p-12">
            <BadgeVintage className="absolute top-4 right-4">{chapterVerse}</BadgeVintage>
            <blockquote className={cn('text-center text-pretty text-lg leading-relaxed', 'text-vintage-ink')}>
              &ldquo;{text}&rdquo;
            </blockquote>
            <cite className={cn('not-italic text-sm text-balance', 'text-vintage-ink/60 font-sans')}>{reference}</cite>
          </div>
        </div>

        {/* Back face */}
        <div
          className={cn(
            'absolute inset-0',
            'aspect-5/7 w-full overflow-hidden rounded-2xl',
            'bg-vintage-paper shadow-[0_8px_32px_var(--vintage-shadow)]',
            'font-serif',
          )}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-2 z-30 overflow-hidden rounded-xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover rounded-xl mix-blend-multiply"
              />
            ) : (
              <div className="flex items-center justify-center size-full">
                <p className="text-vintage-ink text-sm font-sans">No image available</p>
              </div>
            )}
            <span
              className={cn(
                'absolute right-4 bottom-4',
                'text-black mix-blend-overlay opacity-50',
                'text-7xl font-sans font-black tracking-tighter uppercase whitespace-nowrap leading-none',
              )}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {reference}
            </span>
          </div>
          <div
            className={cn('absolute inset-2 z-40 rounded-xl pointer-events-none', 'border-2 border-vintage-paper/60')}
          />
          <OrnamentBorder
            className="z-40"
            colorClassName="text-vintage-paper/60"
          />
          <div
            aria-hidden="true"
            className={cn('pointer-events-none absolute inset-0 z-40 rounded-2xl', 'opacity-[0.12]')}
          />
        </div>
      </motion.div>
    </div>
  );
}
