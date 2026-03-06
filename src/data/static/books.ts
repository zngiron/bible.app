type Testament = 'old' | 'new';

interface BibleBook {
  id: string;
  name: string;
  slug: string;
  testament: Testament;
  chapterCount: number;
  order: number;
}

const bibleBooks = [
  { id: 'GEN', name: 'Genesis', slug: 'genesis', testament: 'old', chapterCount: 50, order: 1 },
  { id: 'EXO', name: 'Exodus', slug: 'exodus', testament: 'old', chapterCount: 40, order: 2 },
  { id: 'LEV', name: 'Leviticus', slug: 'leviticus', testament: 'old', chapterCount: 27, order: 3 },
  { id: 'NUM', name: 'Numbers', slug: 'numbers', testament: 'old', chapterCount: 36, order: 4 },
  { id: 'DEU', name: 'Deuteronomy', slug: 'deuteronomy', testament: 'old', chapterCount: 34, order: 5 },
  { id: 'JOS', name: 'Joshua', slug: 'joshua', testament: 'old', chapterCount: 24, order: 6 },
  { id: 'JDG', name: 'Judges', slug: 'judges', testament: 'old', chapterCount: 21, order: 7 },
  { id: 'RUT', name: 'Ruth', slug: 'ruth', testament: 'old', chapterCount: 4, order: 8 },
  { id: '1SA', name: '1 Samuel', slug: '1-samuel', testament: 'old', chapterCount: 31, order: 9 },
  { id: '2SA', name: '2 Samuel', slug: '2-samuel', testament: 'old', chapterCount: 24, order: 10 },
  { id: '1KI', name: '1 Kings', slug: '1-kings', testament: 'old', chapterCount: 22, order: 11 },
  { id: '2KI', name: '2 Kings', slug: '2-kings', testament: 'old', chapterCount: 25, order: 12 },
  { id: '1CH', name: '1 Chronicles', slug: '1-chronicles', testament: 'old', chapterCount: 29, order: 13 },
  { id: '2CH', name: '2 Chronicles', slug: '2-chronicles', testament: 'old', chapterCount: 36, order: 14 },
  { id: 'EZR', name: 'Ezra', slug: 'ezra', testament: 'old', chapterCount: 10, order: 15 },
  { id: 'NEH', name: 'Nehemiah', slug: 'nehemiah', testament: 'old', chapterCount: 13, order: 16 },
  { id: 'EST', name: 'Esther', slug: 'esther', testament: 'old', chapterCount: 10, order: 17 },
  { id: 'JOB', name: 'Job', slug: 'job', testament: 'old', chapterCount: 42, order: 18 },
  { id: 'PSA', name: 'Psalms', slug: 'psalms', testament: 'old', chapterCount: 150, order: 19 },
  { id: 'PRO', name: 'Proverbs', slug: 'proverbs', testament: 'old', chapterCount: 31, order: 20 },
  { id: 'ECC', name: 'Ecclesiastes', slug: 'ecclesiastes', testament: 'old', chapterCount: 12, order: 21 },
  { id: 'SNG', name: 'Song of Solomon', slug: 'song-of-solomon', testament: 'old', chapterCount: 8, order: 22 },
  { id: 'ISA', name: 'Isaiah', slug: 'isaiah', testament: 'old', chapterCount: 66, order: 23 },
  { id: 'JER', name: 'Jeremiah', slug: 'jeremiah', testament: 'old', chapterCount: 52, order: 24 },
  { id: 'LAM', name: 'Lamentations', slug: 'lamentations', testament: 'old', chapterCount: 5, order: 25 },
  { id: 'EZK', name: 'Ezekiel', slug: 'ezekiel', testament: 'old', chapterCount: 48, order: 26 },
  { id: 'DAN', name: 'Daniel', slug: 'daniel', testament: 'old', chapterCount: 12, order: 27 },
  { id: 'HOS', name: 'Hosea', slug: 'hosea', testament: 'old', chapterCount: 14, order: 28 },
  { id: 'JOL', name: 'Joel', slug: 'joel', testament: 'old', chapterCount: 3, order: 29 },
  { id: 'AMO', name: 'Amos', slug: 'amos', testament: 'old', chapterCount: 9, order: 30 },
  { id: 'OBA', name: 'Obadiah', slug: 'obadiah', testament: 'old', chapterCount: 1, order: 31 },
  { id: 'JON', name: 'Jonah', slug: 'jonah', testament: 'old', chapterCount: 4, order: 32 },
  { id: 'MIC', name: 'Micah', slug: 'micah', testament: 'old', chapterCount: 7, order: 33 },
  { id: 'NAM', name: 'Nahum', slug: 'nahum', testament: 'old', chapterCount: 3, order: 34 },
  { id: 'HAB', name: 'Habakkuk', slug: 'habakkuk', testament: 'old', chapterCount: 3, order: 35 },
  { id: 'ZEP', name: 'Zephaniah', slug: 'zephaniah', testament: 'old', chapterCount: 3, order: 36 },
  { id: 'HAG', name: 'Haggai', slug: 'haggai', testament: 'old', chapterCount: 2, order: 37 },
  { id: 'ZEC', name: 'Zechariah', slug: 'zechariah', testament: 'old', chapterCount: 14, order: 38 },
  { id: 'MAL', name: 'Malachi', slug: 'malachi', testament: 'old', chapterCount: 4, order: 39 },
  { id: 'MAT', name: 'Matthew', slug: 'matthew', testament: 'new', chapterCount: 28, order: 40 },
  { id: 'MRK', name: 'Mark', slug: 'mark', testament: 'new', chapterCount: 16, order: 41 },
  { id: 'LUK', name: 'Luke', slug: 'luke', testament: 'new', chapterCount: 24, order: 42 },
  { id: 'JHN', name: 'John', slug: 'john', testament: 'new', chapterCount: 21, order: 43 },
  { id: 'ACT', name: 'Acts', slug: 'acts', testament: 'new', chapterCount: 28, order: 44 },
  { id: 'ROM', name: 'Romans', slug: 'romans', testament: 'new', chapterCount: 16, order: 45 },
  { id: '1CO', name: '1 Corinthians', slug: '1-corinthians', testament: 'new', chapterCount: 16, order: 46 },
  { id: '2CO', name: '2 Corinthians', slug: '2-corinthians', testament: 'new', chapterCount: 13, order: 47 },
  { id: 'GAL', name: 'Galatians', slug: 'galatians', testament: 'new', chapterCount: 6, order: 48 },
  { id: 'EPH', name: 'Ephesians', slug: 'ephesians', testament: 'new', chapterCount: 6, order: 49 },
  { id: 'PHP', name: 'Philippians', slug: 'philippians', testament: 'new', chapterCount: 4, order: 50 },
  { id: 'COL', name: 'Colossians', slug: 'colossians', testament: 'new', chapterCount: 4, order: 51 },
  { id: '1TH', name: '1 Thessalonians', slug: '1-thessalonians', testament: 'new', chapterCount: 5, order: 52 },
  { id: '2TH', name: '2 Thessalonians', slug: '2-thessalonians', testament: 'new', chapterCount: 3, order: 53 },
  { id: '1TI', name: '1 Timothy', slug: '1-timothy', testament: 'new', chapterCount: 6, order: 54 },
  { id: '2TI', name: '2 Timothy', slug: '2-timothy', testament: 'new', chapterCount: 4, order: 55 },
  { id: 'TIT', name: 'Titus', slug: 'titus', testament: 'new', chapterCount: 3, order: 56 },
  { id: 'PHM', name: 'Philemon', slug: 'philemon', testament: 'new', chapterCount: 1, order: 57 },
  { id: 'HEB', name: 'Hebrews', slug: 'hebrews', testament: 'new', chapterCount: 13, order: 58 },
  { id: 'JAS', name: 'James', slug: 'james', testament: 'new', chapterCount: 5, order: 59 },
  { id: '1PE', name: '1 Peter', slug: '1-peter', testament: 'new', chapterCount: 5, order: 60 },
  { id: '2PE', name: '2 Peter', slug: '2-peter', testament: 'new', chapterCount: 3, order: 61 },
  { id: '1JN', name: '1 John', slug: '1-john', testament: 'new', chapterCount: 5, order: 62 },
  { id: '2JN', name: '2 John', slug: '2-john', testament: 'new', chapterCount: 1, order: 63 },
  { id: '3JN', name: '3 John', slug: '3-john', testament: 'new', chapterCount: 1, order: 64 },
  { id: 'JUD', name: 'Jude', slug: 'jude', testament: 'new', chapterCount: 1, order: 65 },
  { id: 'REV', name: 'Revelation', slug: 'revelation', testament: 'new', chapterCount: 22, order: 66 },
] as const satisfies readonly BibleBook[];

function getBookById(id: string) {
  return bibleBooks.find((book) => book.id === id.toUpperCase());
}

function getBookBySlug(slug: string) {
  return bibleBooks.find((book) => book.slug === slug.toLowerCase());
}

function getBooksByTestament(testament: Testament) {
  return bibleBooks.filter((book) => book.testament === testament);
}

function getNextBook(slug: string) {
  const book = getBookBySlug(slug);
  if (!book) return undefined;
  return bibleBooks.find((b) => b.order === book.order + 1);
}

function getPreviousBook(slug: string) {
  const book = getBookBySlug(slug);
  if (!book) return undefined;
  return bibleBooks.find((b) => b.order === book.order - 1);
}

export type { BibleBook, Testament };
export { bibleBooks, getBookById, getBookBySlug, getBooksByTestament, getNextBook, getPreviousBook };
