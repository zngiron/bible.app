import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { ButtonGenerateImage } from '@/components/common/button/button-generate-image';
import { ButtonShare } from '@/components/common/button/button-share';
import { CardVerseInteractive } from '@/components/common/card/card-verse-interactive';

import { cn } from '@/lib/utils';

import { getVerse } from '@/data/api/bible';
import { getBookById } from '@/data/static/books';

export async function generateMetadata({ params }: PageProps<'/[book]/[chapter]/[verse]'>): Promise<Metadata> {
  const { book, chapter, verse } = await params;
  const bookData = getBookById(book);

  if (!bookData) return { title: 'Verse Not Found' };

  try {
    const data = await getVerse(bookData.name, Number(chapter), Number(verse));
    const reference = `${bookData.name} ${chapter}:${verse}`;

    return {
      title: reference,
      description: data.text.slice(0, 160),
      openGraph: {
        title: reference,
        description: data.text,
      },
    };
  } catch {
    return { title: `${bookData.name} ${chapter}:${verse}` };
  }
}

export default async function Page({ params }: PageProps<'/[book]/[chapter]/[verse]'>) {
  const { book, chapter, verse } = await params;
  const bookData = getBookById(book);

  if (!bookData) notFound();

  const chapterNum = Number(chapter);
  const verseNum = Number(verse);

  if (Number.isNaN(chapterNum) || Number.isNaN(verseNum) || chapterNum < 1 || verseNum < 1) {
    notFound();
  }

  if (chapterNum > bookData.chapterCount) notFound();

  let verseText: string;
  try {
    const data = await getVerse(bookData.name, chapterNum, verseNum);
    verseText = data.text;
  } catch {
    notFound();
  }

  const reference = `${bookData.name} ${chapter}:${verse}`;

  return (
    <section className={cn('flex flex-col items-center justify-center gap-6', 'min-h-[calc(100dvh-4rem)] px-4 py-8')}>
      <h1 className="sr-only">{reference}</h1>

      <CardVerseInteractive
        reference={reference}
        text={verseText}
      />

      <div className="flex items-center gap-3">
        <ButtonShare
          reference={reference}
          text={verseText}
        />
        <ButtonGenerateImage
          reference={reference}
          verseText={verseText}
        />
      </div>

      <p className={cn('max-w-sm text-center text-xs', 'text-muted-foreground font-sans')}>
        Drag the card to flip it. Double-click to toggle.
      </p>
    </section>
  );
}
