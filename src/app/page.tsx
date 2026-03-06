import type { Metadata } from 'next';

import { GridBook } from '@/components/common/grid/grid-book';

import { bibleBooks } from '@/data/static/books';

export const metadata: Metadata = {
  title: 'Books of the Bible',
  description: 'Explore all 66 books of the Bible as beautifully designed vintage trading cards.',
};

export default function Page(_: PageProps<'/'>) {
  return (
    <section className="mx-auto max-w-7xl py-8">
      <h1 className="sr-only">Books of the Bible</h1>
      <GridBook books={bibleBooks} />
    </section>
  );
}
