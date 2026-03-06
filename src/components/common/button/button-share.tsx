'use client';

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

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
    <Button
      variant="secondary"
      size="sm"
      onClick={handleShare}
    >
      <Share2
        className="size-4"
        aria-hidden="true"
      />
      Share
    </Button>
  );
}
