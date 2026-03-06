import { z } from 'zod';

import { logger } from '@/lib/logger';

const bibleApiUrl = 'https://bible-api.com';

const verseSchema = z.object({
  book_id: z.string(),
  book_name: z.string(),
  chapter: z.number(),
  verse: z.number(),
  text: z.string(),
});

const referenceResponseSchema = z.object({
  reference: z.string(),
  verses: z.array(verseSchema),
  text: z.string(),
  translation_id: z.string(),
  translation_name: z.string(),
  translation_note: z.string(),
});

interface BibleVerse {
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
}

interface BibleReference {
  reference: string;
  verses: BibleVerse[];
  text: string;
  translationId: string;
  translationName: string;
}

function transformVerse(raw: z.infer<typeof verseSchema>): BibleVerse {
  return {
    bookId: raw.book_id,
    bookName: raw.book_name,
    chapter: raw.chapter,
    verse: raw.verse,
    text: raw.text.trim(),
  };
}

function transformReference(raw: z.infer<typeof referenceResponseSchema>): BibleReference {
  return {
    reference: raw.reference,
    verses: raw.verses.map(transformVerse),
    text: raw.text.trim(),
    translationId: raw.translation_id,
    translationName: raw.translation_name,
  };
}

async function fetchBibleApi(path: string): Promise<unknown> {
  const url = `${bibleApiUrl}/${path}`;

  try {
    const response = await fetch(url, { next: { revalidate: false } });

    if (!response.ok) {
      const message = `Bible API error: ${response.status} ${response.statusText}`;
      logger.error({ url }, message);
      throw new Error(message);
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('Bible API')) {
      throw error;
    }
    const message = error instanceof Error ? error.message : String(error);
    logger.error({ url }, message);
    throw new Error(`Failed to fetch from Bible API: ${message}`);
  }
}

async function getChapterVerses(bookName: string, chapter: number): Promise<BibleReference> {
  const data = await fetchBibleApi(`${encodeURIComponent(bookName)}+${chapter}?translation=web`);
  const parsed = referenceResponseSchema.parse(data);
  return transformReference(parsed);
}

async function getVerse(bookName: string, chapter: number, verse: number): Promise<BibleReference> {
  const data = await fetchBibleApi(`${encodeURIComponent(bookName)}+${chapter}:${verse}?translation=web`);
  const parsed = referenceResponseSchema.parse(data);
  return transformReference(parsed);
}

async function getVerseRange(
  bookName: string,
  chapter: number,
  verseStart: number,
  verseEnd: number,
): Promise<BibleReference> {
  const data = await fetchBibleApi(
    `${encodeURIComponent(bookName)}+${chapter}:${verseStart}-${verseEnd}?translation=web`,
  );
  const parsed = referenceResponseSchema.parse(data);
  return transformReference(parsed);
}

export type { BibleReference, BibleVerse };
export { getChapterVerses, getVerse, getVerseRange };
