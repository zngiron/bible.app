import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { ButtonGenerateImage } from '@/components/common/button/button-generate-image';
import { ButtonShare } from '@/components/common/button/button-share';
import { CardVerseInteractive } from '@/components/common/card/card-verse-interactive';
import { VerseNav } from '@/components/common/nav/verse-nav';

import { cn } from '@/lib/utils';

import { getChapterVerses, getVerse } from '@/data/api/bible';
import { getBookBySlug } from '@/data/static/books';

export async function generateMetadata({ params }: PageProps<'/[book]/[chapter]/[verse]'>): Promise<Metadata> {
  const { book, chapter, verse } = await params;
  const bookData = getBookBySlug(book);

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
  const bookData = getBookBySlug(book);

  if (!bookData) notFound();

  const chapterNum = Number(chapter);
  const verseNum = Number(verse);

  if (Number.isNaN(chapterNum) || Number.isNaN(verseNum) || chapterNum < 1 || verseNum < 1) {
    notFound();
  }

  if (chapterNum > bookData.chapterCount) notFound();

  let verseText: string;
  let totalVersesInChapter: number;
  try {
    const [verseData, chapterData] = await Promise.all([
      getVerse(bookData.name, chapterNum, verseNum),
      getChapterVerses(bookData.name, chapterNum),
    ]);
    verseText = verseData.text;
    totalVersesInChapter = chapterData.verses.length;
  } catch {
    notFound();
  }

  const reference = `${bookData.name} ${chapter}:${verse}`;
  const mockImages = ['/images/genesis-1-1.png', '/images/john-3-16.png', '/images/ecclesiastes-3:1.png'];
  const mockImageUrl = mockImages[(bookData.order + chapterNum + verseNum) % mockImages.length];

  return (
    <section className={cn('relative flex items-center justify-center', 'h-full px-4')}>
      <h1 className="sr-only">{reference}</h1>

      <CardVerseInteractive
        reference={reference}
        text={verseText}
        imageUrl={mockImageUrl}
      />

      <div className={cn('absolute bottom-24 left-0 right-0 z-30', 'flex items-center justify-center gap-3')}>
        <ButtonShare
          reference={reference}
          text={verseText}
        />
        <ButtonGenerateImage
          reference={reference}
          verseText={verseText}
        />
      </div>

      <VerseNav
        bookSlug={book}
        chapter={chapterNum}
        verse={verseNum}
        chapterCount={bookData.chapterCount}
        totalVersesInChapter={totalVersesInChapter}
      />
    </section>
  );
}
