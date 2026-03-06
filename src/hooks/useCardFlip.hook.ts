import { useState } from 'react';

import { animate, useMotionValue, useReducedMotion } from 'motion/react';

import { springSmooth } from '@/lib/spring-presets';

interface PanInfo {
  offset: { x: number };
}

export function useCardFlip() {
  const rotateY = useMotionValue(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  function handleDragUpdate(info: PanInfo) {
    rotateY.set(info.offset.x * 0.5);
  }

  function handleDragSnap() {
    const currentRotation = rotateY.get();
    const shouldFlip = Math.abs(currentRotation) > 60;
    const targetRotation = shouldFlip ? (currentRotation > 0 ? 180 : -180) : 0;

    if (shouldReduceMotion) {
      rotateY.set(targetRotation);
    } else {
      animate(rotateY, targetRotation, { type: 'spring', ...springSmooth });
    }

    setIsFlipped(shouldFlip ? !isFlipped : isFlipped);
  }

  function flipCard() {
    const target = isFlipped ? 0 : 180;

    if (shouldReduceMotion) {
      rotateY.set(target);
    } else {
      animate(rotateY, target, { type: 'spring', ...springSmooth });
    }

    setIsFlipped(!isFlipped);
  }

  return { rotateY, isFlipped, handleDragUpdate, handleDragSnap, flipCard };
}
