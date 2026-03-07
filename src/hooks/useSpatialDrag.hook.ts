import { useRef, useState } from 'react';

export function useSpatialDrag() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const dragProps = {
    drag: 'y' as const,
    dragConstraints: containerRef,
    dragElastic: 0.1,
    dragTransition: { bounceStiffness: 300, bounceDamping: 30 },
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  };

  const cursorClassName = isDragging ? 'cursor-grabbing' : 'cursor-grab';

  return { containerRef, isDragging, dragProps, cursorClassName };
}
