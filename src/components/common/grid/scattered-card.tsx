'use client';

import type { ReactNode } from 'react';

import { useRef } from 'react';

import { motion } from 'motion/react';

import { maxStaggerDelay, springGentle, staggerDelay } from '@/lib/spring-presets';

import { useCardTilt } from '@/hooks/useCardTilt.hook';

interface ScatteredCardProps {
  children: ReactNode;
  index: number;
}

export function ScatteredCard({ children, index }: ScatteredCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { tiltX, tiltY, handlePointerMove, handlePointerLeave } = useCardTilt(cardRef, 15);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: Math.min(index * staggerDelay, maxStaggerDelay), ...springGentle }}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      className="relative aspect-5/7"
      style={{ perspective: '800px' }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <motion.div
        className="size-full"
        style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: 'preserve-3d' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
