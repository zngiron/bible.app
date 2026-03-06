import type { Metadata } from 'next';

import { ButtonBack } from '@/components/common/button/button-back';
import { GridBookSpatial } from '@/components/common/grid/grid-book-spatial';

import { getBooksByTestament } from '@/data/static/books';

export const metadata: Metadata = {
  title: 'Old Testament',
  description: 'Explore all 39 books of the Old Testament as beautifully crafted vintage trading cards.',
};

export default function Page() {
  const books = getBooksByTestament('old');

  return (
    <section className="relative h-full">
      <ButtonBack
        href="/"
        label="Home"
      />
      <h1 className="sr-only">Old Testament</h1>
      <GridBookSpatial books={books} />
    </section>
  );
}
