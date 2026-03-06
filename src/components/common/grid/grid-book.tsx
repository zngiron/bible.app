'use client';

import type { BibleBook } from '@/data/static/books';

import { CardBook } from '@/components/common/card/card-book';

interface GridBookProps {
  books: readonly BibleBook[];
  offsetIndex?: number;
}

export function GridBook({ books, offsetIndex = 0 }: GridBookProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-5 md:gap-6">
      {books.map((book, index) => (
        <CardBook
          key={book.id}
          book={book}
          index={index + offsetIndex}
        />
      ))}
    </div>
  );
}
