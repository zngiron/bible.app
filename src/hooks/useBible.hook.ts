import { useQuery } from '@tanstack/react-query';

import { getChapterVerses, getVerse } from '@/data/api/bible';

const staleForever = { staleTime: Number.POSITIVE_INFINITY, gcTime: 1000 * 60 * 60 };

export function useChapterVerses(bookName: string, chapter: number) {
  return useQuery({
    queryKey: ['bible', 'chapter', bookName, chapter],
    queryFn: () => getChapterVerses(bookName, chapter),
    ...staleForever,
  });
}

export function useVerse(bookName: string, chapter: number, verse: number) {
  return useQuery({
    queryKey: ['bible', 'verse', bookName, chapter, verse],
    queryFn: () => getVerse(bookName, chapter, verse),
    ...staleForever,
  });
}
