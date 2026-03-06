'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

interface ButtonShareProps {
  reference: string;
  text: string;
}

export function ButtonShare({ reference, text }: ButtonShareProps) {
  async function handleShare() {
    const shareData = {
      title: reference,
      text: `"${text}" - ${reference}`,
      url: window.location.href,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          toast.error('Failed to share');
        }
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`"${text}" - ${reference}\n${window.location.href}`);
      toast.success('Copied to clipboard');
    } catch {
      toast.error('Failed to copy');
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-2',
        'bg-vintage-paper/90 text-vintage-ink shadow-lg',
        'text-sm font-sans',
        'hover:bg-vintage-paper',
      )}
    >
      <Share2
        className="size-4"
        aria-hidden="true"
      />
      Share
    </button>
  );
}
