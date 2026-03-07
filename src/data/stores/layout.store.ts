import { create } from 'zustand';

type ViewMode = 'grid' | 'list';
type NavMode = 'browse' | 'search-books' | 'search-chapters' | 'search-verses' | 'chapter-select';

interface SearchSelectedBook {
  slug: string;
  name: string;
  chapterCount: number;
}

interface LayoutState {
  viewMode: ViewMode;
  navMode: NavMode;
  searchQuery: string;
  searchSelectedBook: SearchSelectedBook | null;
  searchSelectedChapter: number | null;
  currentBookSlug: string | null;
  currentChapter: number | null;
  currentChapterCount: number | null;
}

interface LayoutActions {
  setViewMode: (mode: ViewMode) => void;
  setNavMode: (mode: NavMode) => void;
  setSearchQuery: (query: string) => void;
  setSearchSelectedBook: (book: SearchSelectedBook) => void;
  setSearchSelectedChapter: (chapter: number) => void;
  setCurrentBook: (slug: string, chapterCount: number) => void;
  setCurrentChapter: (chapter: number) => void;
  resetSearch: () => void;
}

export const useLayoutStore = create<LayoutState & LayoutActions>((set) => ({
  viewMode: 'grid',
  navMode: 'browse',
  searchQuery: '',
  searchSelectedBook: null,
  searchSelectedChapter: null,
  currentBookSlug: null,
  currentChapter: null,
  currentChapterCount: null,
  setViewMode: (mode) => set({ viewMode: mode }),
  setNavMode: (mode) => set({ navMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSearchSelectedBook: (book) => set({ searchSelectedBook: book, navMode: 'search-chapters', searchQuery: '' }),
  setSearchSelectedChapter: (chapter) => set({ searchSelectedChapter: chapter, navMode: 'search-verses' }),
  setCurrentBook: (slug, chapterCount) => set({ currentBookSlug: slug, currentChapterCount: chapterCount }),
  setCurrentChapter: (chapter) => set({ currentChapter: chapter }),
  resetSearch: () =>
    set({
      navMode: 'browse',
      searchQuery: '',
      searchSelectedBook: null,
      searchSelectedChapter: null,
    }),
}));
