type Testament = 'old' | 'new';

interface BibleBook {
  id: string;
  name: string;
  testament: Testament;
  chapterCount: number;
  order: number;
}

const bibleBooks = [
  { id: 'GEN', name: 'Genesis', testament: 'old', chapterCount: 50, order: 1 },
  { id: 'EXO', name: 'Exodus', testament: 'old', chapterCount: 40, order: 2 },
  { id: 'LEV', name: 'Leviticus', testament: 'old', chapterCount: 27, order: 3 },
  { id: 'NUM', name: 'Numbers', testament: 'old', chapterCount: 36, order: 4 },
  { id: 'DEU', name: 'Deuteronomy', testament: 'old', chapterCount: 34, order: 5 },
  { id: 'JOS', name: 'Joshua', testament: 'old', chapterCount: 24, order: 6 },
  { id: 'JDG', name: 'Judges', testament: 'old', chapterCount: 21, order: 7 },
  { id: 'RUT', name: 'Ruth', testament: 'old', chapterCount: 4, order: 8 },
  { id: '1SA', name: '1 Samuel', testament: 'old', chapterCount: 31, order: 9 },
  { id: '2SA', name: '2 Samuel', testament: 'old', chapterCount: 24, order: 10 },
  { id: '1KI', name: '1 Kings', testament: 'old', chapterCount: 22, order: 11 },
  { id: '2KI', name: '2 Kings', testament: 'old', chapterCount: 25, order: 12 },
  { id: '1CH', name: '1 Chronicles', testament: 'old', chapterCount: 29, order: 13 },
  { id: '2CH', name: '2 Chronicles', testament: 'old', chapterCount: 36, order: 14 },
  { id: 'EZR', name: 'Ezra', testament: 'old', chapterCount: 10, order: 15 },
  { id: 'NEH', name: 'Nehemiah', testament: 'old', chapterCount: 13, order: 16 },
  { id: 'EST', name: 'Esther', testament: 'old', chapterCount: 10, order: 17 },
  { id: 'JOB', name: 'Job', testament: 'old', chapterCount: 42, order: 18 },
  { id: 'PSA', name: 'Psalms', testament: 'old', chapterCount: 150, order: 19 },
  { id: 'PRO', name: 'Proverbs', testament: 'old', chapterCount: 31, order: 20 },
  { id: 'ECC', name: 'Ecclesiastes', testament: 'old', chapterCount: 12, order: 21 },
  { id: 'SNG', name: 'Song of Solomon', testament: 'old', chapterCount: 8, order: 22 },
  { id: 'ISA', name: 'Isaiah', testament: 'old', chapterCount: 66, order: 23 },
  { id: 'JER', name: 'Jeremiah', testament: 'old', chapterCount: 52, order: 24 },
  { id: 'LAM', name: 'Lamentations', testament: 'old', chapterCount: 5, order: 25 },
  { id: 'EZK', name: 'Ezekiel', testament: 'old', chapterCount: 48, order: 26 },
  { id: 'DAN', name: 'Daniel', testament: 'old', chapterCount: 12, order: 27 },
  { id: 'HOS', name: 'Hosea', testament: 'old', chapterCount: 14, order: 28 },
  { id: 'JOL', name: 'Joel', testament: 'old', chapterCount: 3, order: 29 },
  { id: 'AMO', name: 'Amos', testament: 'old', chapterCount: 9, order: 30 },
  { id: 'OBA', name: 'Obadiah', testament: 'old', chapterCount: 1, order: 31 },
  { id: 'JON', name: 'Jonah', testament: 'old', chapterCount: 4, order: 32 },
  { id: 'MIC', name: 'Micah', testament: 'old', chapterCount: 7, order: 33 },
  { id: 'NAM', name: 'Nahum', testament: 'old', chapterCount: 3, order: 34 },
  { id: 'HAB', name: 'Habakkuk', testament: 'old', chapterCount: 3, order: 35 },
  { id: 'ZEP', name: 'Zephaniah', testament: 'old', chapterCount: 3, order: 36 },
  { id: 'HAG', name: 'Haggai', testament: 'old', chapterCount: 2, order: 37 },
  { id: 'ZEC', name: 'Zechariah', testament: 'old', chapterCount: 14, order: 38 },
  { id: 'MAL', name: 'Malachi', testament: 'old', chapterCount: 4, order: 39 },
  { id: 'MAT', name: 'Matthew', testament: 'new', chapterCount: 28, order: 40 },
  { id: 'MRK', name: 'Mark', testament: 'new', chapterCount: 16, order: 41 },
  { id: 'LUK', name: 'Luke', testament: 'new', chapterCount: 24, order: 42 },
  { id: 'JHN', name: 'John', testament: 'new', chapterCount: 21, order: 43 },
  { id: 'ACT', name: 'Acts', testament: 'new', chapterCount: 28, order: 44 },
  { id: 'ROM', name: 'Romans', testament: 'new', chapterCount: 16, order: 45 },
  { id: '1CO', name: '1 Corinthians', testament: 'new', chapterCount: 16, order: 46 },
  { id: '2CO', name: '2 Corinthians', testament: 'new', chapterCount: 13, order: 47 },
  { id: 'GAL', name: 'Galatians', testament: 'new', chapterCount: 6, order: 48 },
  { id: 'EPH', name: 'Ephesians', testament: 'new', chapterCount: 6, order: 49 },
  { id: 'PHP', name: 'Philippians', testament: 'new', chapterCount: 4, order: 50 },
  { id: 'COL', name: 'Colossians', testament: 'new', chapterCount: 4, order: 51 },
  { id: '1TH', name: '1 Thessalonians', testament: 'new', chapterCount: 5, order: 52 },
  { id: '2TH', name: '2 Thessalonians', testament: 'new', chapterCount: 3, order: 53 },
  { id: '1TI', name: '1 Timothy', testament: 'new', chapterCount: 6, order: 54 },
  { id: '2TI', name: '2 Timothy', testament: 'new', chapterCount: 4, order: 55 },
  { id: 'TIT', name: 'Titus', testament: 'new', chapterCount: 3, order: 56 },
  { id: 'PHM', name: 'Philemon', testament: 'new', chapterCount: 1, order: 57 },
  { id: 'HEB', name: 'Hebrews', testament: 'new', chapterCount: 13, order: 58 },
  { id: 'JAS', name: 'James', testament: 'new', chapterCount: 5, order: 59 },
  { id: '1PE', name: '1 Peter', testament: 'new', chapterCount: 5, order: 60 },
  { id: '2PE', name: '2 Peter', testament: 'new', chapterCount: 3, order: 61 },
  { id: '1JN', name: '1 John', testament: 'new', chapterCount: 5, order: 62 },
  { id: '2JN', name: '2 John', testament: 'new', chapterCount: 1, order: 63 },
  { id: '3JN', name: '3 John', testament: 'new', chapterCount: 1, order: 64 },
  { id: 'JUD', name: 'Jude', testament: 'new', chapterCount: 1, order: 65 },
  { id: 'REV', name: 'Revelation', testament: 'new', chapterCount: 22, order: 66 },
] as const satisfies readonly BibleBook[];

function getBookById(id: string) {
  return bibleBooks.find((book) => book.id === id.toUpperCase());
}

function getBooksByTestament(testament: Testament) {
  return bibleBooks.filter((book) => book.testament === testament);
}

export type { BibleBook, Testament };
export { bibleBooks, getBookById, getBooksByTestament };
