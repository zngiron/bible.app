'use client';

import { useState } from 'react';

import { Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

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
    <Button
      variant="secondary"
      size="sm"
      onClick={handleGenerate}
      disabled={isGenerating}
    >
      <Sparkles
        className="size-4"
        aria-hidden="true"
      />
      {isGenerating ? 'Generating...' : 'Generate Art'}
    </Button>
  );
}
