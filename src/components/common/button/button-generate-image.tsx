'use client';

import { useState } from 'react';

import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

interface ButtonGenerateImageProps {
  reference: string;
  verseText: string;
}

export function ButtonGenerateImage({ reference }: ButtonGenerateImageProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  async function handleGenerate() {
    setIsGenerating(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('Image generated and saved', {
        description: `Art for ${reference} has been created.`,
      });
    } catch {
      toast.error('Failed to generate image');
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={isGenerating}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-2',
        'bg-vintage-paper/90 text-vintage-ink shadow-lg',
        'text-sm font-sans',
        'hover:bg-vintage-paper',
        'disabled:opacity-50',
      )}
    >
      <Sparkles
        className="size-4"
        aria-hidden="true"
      />
      {isGenerating ? 'Generating...' : 'Generate Art'}
    </button>
  );
}
