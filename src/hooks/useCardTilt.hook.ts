import type { RefObject } from 'react';

import { useCallback, useEffect, useState } from 'react';

import { useReducedMotion, useSpring } from 'motion/react';

import { springSnappy } from '@/lib/spring-presets';

interface CardTiltOptions {
  maxTilt?: number;
  global?: boolean;
}

const defaultMaxTilt = 20;

export function useCardTilt(containerRef: RefObject<HTMLDivElement | null>, options: CardTiltOptions | number = {}) {
  const { maxTilt = defaultMaxTilt, global: globalTracking = false } =
    typeof options === 'number' ? { maxTilt: options } : options;

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
    [shouldReduceMotion, maxTilt, tiltX, tiltY],
  );

  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window === 'undefined' || !('DeviceOrientationEvent' in window)) return;

    const requiredEvents = 3;
    let validEventCount = 0;
    let probeCleanup: (() => void) | undefined;

    function probeOrientation(event: DeviceOrientationEvent) {
      if (event.alpha === null && event.beta === null && event.gamma === null) return;

      validEventCount++;
      if (validEventCount >= requiredEvents) {
        setHasGyroscope(true);
        probeCleanup?.();
      }
    }

    function startProbe() {
      window.addEventListener('deviceorientation', probeOrientation);
      probeCleanup = () => window.removeEventListener('deviceorientation', probeOrientation);
    }

    async function requestPermission() {
      const DeviceOrientation = DeviceOrientationEvent as unknown as {
        requestPermission?: () => Promise<string>;
      };

      if (typeof DeviceOrientation.requestPermission === 'function') {
        try {
          const permission = await DeviceOrientation.requestPermission();
          if (permission === 'granted') {
            startProbe();
          }
        } catch {
          setHasGyroscope(false);
        }
      } else {
        startProbe();
      }
    }

    requestPermission();

    return () => probeCleanup?.();
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (!hasGyroscope || shouldReduceMotion) return;

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [hasGyroscope, shouldReduceMotion, handleOrientation]);

  useEffect(() => {
    if (!globalTracking || shouldReduceMotion || hasGyroscope) return;

    function onMouseMove(event: MouseEvent) {
      const normalizedX = event.clientX / window.innerWidth - 0.5;
      const normalizedY = event.clientY / window.innerHeight - 0.5;

      tiltX.set(normalizedY * maxTilt);
      tiltY.set(-normalizedX * maxTilt);
    }

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [globalTracking, shouldReduceMotion, hasGyroscope, maxTilt, tiltX, tiltY]);

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || hasGyroscope || globalTracking) return;

    const element = containerRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;

    tiltX.set(-normalizedY * maxTilt);
    tiltY.set(normalizedX * maxTilt);
  }

  function handlePointerLeave() {
    if (hasGyroscope || globalTracking) return;
    tiltX.set(0);
    tiltY.set(0);
  }

  return { tiltX, tiltY, handlePointerMove, handlePointerLeave };
}
