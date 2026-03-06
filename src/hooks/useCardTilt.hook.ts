import type { RefObject } from 'react';

import { useCallback, useEffect, useState } from 'react';

import { useReducedMotion, useSpring } from 'motion/react';

import { springSnappy } from '@/lib/spring-presets';

const maxTilt = 20;

export function useCardTilt(containerRef: RefObject<HTMLDivElement | null>) {
  const shouldReduceMotion = useReducedMotion();
  const [hasGyroscope, setHasGyroscope] = useState(false);

  const tiltX = useSpring(0, springSnappy);
  const tiltY = useSpring(0, springSnappy);

  const handleOrientation = useCallback(
    (event: DeviceOrientationEvent) => {
      if (shouldReduceMotion) return;

      const beta = event.beta ?? 0;
      const gamma = event.gamma ?? 0;

      const clampedBeta = Math.max(-maxTilt, Math.min(maxTilt, (beta - 45) * 0.5));
      const clampedGamma = Math.max(-maxTilt, Math.min(maxTilt, gamma * 0.5));

      tiltX.set(clampedBeta);
      tiltY.set(clampedGamma);
    },
    [shouldReduceMotion, tiltX, tiltY],
  );

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return;

    async function requestPermission() {
      const DeviceOrientation = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };

      if (typeof DeviceOrientation.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientation.requestPermission();
          if (permission === 'granted') {
            setHasGyroscope(true);
          }
        } catch {
          setHasGyroscope(false);
        }
      } else {
        setHasGyroscope(true);
      }
    }

    requestPermission();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!hasGyroscope || shouldReduceMotion) return;

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [hasGyroscope, shouldReduceMotion, handleOrientation]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || hasGyroscope) return;

    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(-normalizedY * maxTilt);
    tiltY.set(normalizedX * maxTilt);
  }

  function handlePointerLeave() {
    if (hasGyroscope) return;
    tiltX.set(0);
    tiltY.set(0);
  }

  return { tiltX, tiltY, handlePointerMove, handlePointerLeave };
}
