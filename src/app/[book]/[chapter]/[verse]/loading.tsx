'use client';

import { SkeletonCard } from '@/components/common/card/skeleton-card';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-4rem)] px-4">
      <div className="w-full max-w-xs">
        <SkeletonCard />
      </div>
    </div>
  );
}
