import type { Metadata } from 'next';

import { notFound } from 'next/navigation';

import { GridVerseSpatial } from '@/components/common/grid/grid-verse-spatial';

import { getQueryClient } from '@/lib/client';

import { getChapterVerses } from '@/data/api/bible';
import { getBookById } from '@/data/static/books';

export async function generateMetadata({ params }: PageProps<'/[book]'>): Promise<Metadata> {
  const { book } = await params;
  const bookData = getBookById(book);

  if (!bookData) return { title: 'Book Not Found' };

  return {
    title: bookData.name,
    description: `Explore all chapters and verses of ${bookData.name} as beautifully crafted vintage trading cards.`,
  };
}

export default async function Page({ params }: PageProps<'/[book]'>) {
  const { book } = await params;
  const bookData = getBookById(book);

  if (!bookData) notFound();

  const client = getQueryClient();
  await client.prefetchQuery({
    queryKey: ['bible', 'chapter', bookData.name, 1],
    queryFn: () => getChapterVerses(bookData.name, 1),
  });

  return (
    <section className="relative h-[calc(100dvh-4rem)]">
      <h1 className="sr-only">{bookData.name}</h1>
      <GridVerseSpatial
        bookId={bookData.id}
        bookName={bookData.name}
        chapterCount={bookData.chapterCount}
      />
    </section>
  );
}
