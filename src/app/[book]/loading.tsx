'use client';

import { SkeletonCard } from '@/components/common/card/skeleton-card';

const skeletonKeys = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'] as const;

export default function Loading() {
  return (
    <div className="grid grid-cols-2 gap-4 p-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5 md:gap-6">
      {skeletonKeys.map((id) => (
        <SkeletonCard key={id} />
      ))}
    </div>
  );
}
