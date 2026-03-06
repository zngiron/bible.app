import type { Metadata } from 'next';

import { ButtonBack } from '@/components/common/button/button-back';
import { GridBookSpatial } from '@/components/common/grid/grid-book-spatial';

import { getBooksByTestament } from '@/data/static/books';

export const metadata: Metadata = {
  title: 'New Testament',
  description: 'Explore all 27 books of the New Testament as beautifully crafted vintage trading cards.',
};

export default function Page() {
  const books = getBooksByTestament('new');

  return (
    <section className="relative h-full">
      <ButtonBack
        href="/"
        label="Home"
      />
      <h1 className="sr-only">New Testament</h1>
      <GridBookSpatial books={books} />
    </section>
  );
}
