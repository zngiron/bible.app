'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { BookOpen, Grid3X3, Home, List, Search, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { springSnappy } from '@/lib/spring-presets';
import { cn } from '@/lib/utils';

import { bibleBooks } from '@/data/static/books';
import { useLayoutStore } from '@/data/stores/layout.store';

export function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const navMode = useLayoutStore((state) => state.navMode);
  const searchQuery = useLayoutStore((state) => state.searchQuery);
  const searchSelectedBook = useLayoutStore((state) => state.searchSelectedBook);
  const viewMode = useLayoutStore((state) => state.viewMode);
  const currentBookSlug = useLayoutStore((state) => state.currentBookSlug);
  const currentChapter = useLayoutStore((state) => state.currentChapter);
  const currentChapterCount = useLayoutStore((state) => state.currentChapterCount);
  const setNavMode = useLayoutStore((state) => state.setNavMode);
  const setSearchQuery = useLayoutStore((state) => state.setSearchQuery);
  const setSearchSelectedBook = useLayoutStore((state) => state.setSearchSelectedBook);
  const setViewMode = useLayoutStore((state) => state.setViewMode);
  const resetSearch = useLayoutStore((state) => state.resetSearch);

  const [showBooks, setShowBooks] = useState(false);
  const [showChapterSelect, setShowChapterSelect] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === '/';
  const isBooks = pathname.startsWith('/old') || pathname.startsWith('/new');
  const isSearchMode = navMode !== 'browse';

  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return bibleBooks;
    const lower = searchQuery.toLowerCase();
    return bibleBooks.filter((book) => book.name.toLowerCase().includes(lower));
  }, [searchQuery]);

  const handleStartSearch = useCallback(() => {
    setShowBooks(false);
    setShowChapterSelect(false);
    setNavMode('search-books');
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [setNavMode]);

  const handleCancelSearch = useCallback(() => {
    resetSearch();
  }, [resetSearch]);

  const handleSelectSearchBook = useCallback(
    (book: { slug: string; name: string; chapterCount: number }) => {
      setSearchSelectedBook(book);
    },
    [setSearchSelectedBook],
  );

  const handleSelectSearchChapter = useCallback(
    (chapter: number) => {
      if (!searchSelectedBook) return;
      if (searchSelectedBook.chapterCount === 1) {
        router.push(`/${searchSelectedBook.slug}/1/1`);
        resetSearch();
        return;
      }
      setNavMode('search-verses');
      useLayoutStore.getState().searchSelectedChapter;
      useLayoutStore.setState({ searchSelectedChapter: chapter, navMode: 'search-verses' });
    },
    [searchSelectedBook, router, resetSearch, setNavMode],
  );

  const handleSelectSearchVerse = useCallback(
    (verse: number) => {
      if (!searchSelectedBook) return;
      const chapter = useLayoutStore.getState().searchSelectedChapter ?? 1;
      router.push(`/${searchSelectedBook.slug}/${chapter}/${verse}`);
      resetSearch();
    },
    [searchSelectedBook, router, resetSearch],
  );

  const handleChapterSelect = useCallback(
    (chapter: number) => {
      if (!currentBookSlug) return;
      router.push(`/${currentBookSlug}/${chapter}/1`);
      setShowChapterSelect(false);
    },
    [currentBookSlug, router],
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowBooks(false);
        setShowChapterSelect(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isSearchMode) resetSearch();
        setShowBooks(false);
        setShowChapterSelect(false);
      }
    }

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSearchMode, resetSearch]);

  useEffect(() => {
    setShowBooks(false);
    setShowChapterSelect(false);
    if (isSearchMode) resetSearch();
  }, [isSearchMode, resetSearch]);

  return (
    <div
      ref={navRef}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50"
    >
      <AnimatePresence>
        {showBooks && !isSearchMode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute bottom-14 left-1/2 -translate-x-1/2',
              'flex gap-2 p-2',
              'bg-vintage-paper/95 backdrop-blur-md shadow-xl rounded-2xl',
            )}
          >
            <Link
              href="/old"
              onClick={() => setShowBooks(false)}
              className={cn(
                'rounded-xl px-4 py-2.5',
                'text-sm font-serif font-medium whitespace-nowrap',
                pathname.startsWith('/old')
                  ? 'bg-vintage-gold/20 text-vintage-ink'
                  : 'text-vintage-ink/60 hover:bg-vintage-gold/10',
              )}
            >
              Old Testament
            </Link>
            <Link
              href="/new"
              onClick={() => setShowBooks(false)}
              className={cn(
                'rounded-xl px-4 py-2.5',
                'text-sm font-serif font-medium whitespace-nowrap',
                pathname.startsWith('/new')
                  ? 'bg-vintage-gold/20 text-vintage-ink'
                  : 'text-vintage-ink/60 hover:bg-vintage-gold/10',
              )}
            >
              New Testament
            </Link>
          </motion.div>
        )}

        {showChapterSelect && currentBookSlug && currentChapterCount && !isSearchMode && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={cn(
              'absolute bottom-14 left-1/2 -translate-x-1/2',
              'w-64 max-h-72 overflow-y-auto p-2',
              'bg-vintage-paper/95 backdrop-blur-md shadow-xl rounded-2xl',
              '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vintage-border/40',
            )}
          >
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: currentChapterCount }, (_, i) => i + 1).map((chapter) => (
                <button
                  key={chapter}
                  type="button"
                  onClick={() => handleChapterSelect(chapter)}
                  className={cn(
                    'flex items-center justify-center size-10 rounded-lg',
                    'text-sm font-sans',
                    chapter === currentChapter
                      ? 'bg-vintage-gold/30 text-vintage-ink font-semibold'
                      : 'text-vintage-ink/60 hover:bg-vintage-gold/10 hover:text-vintage-ink',
                  )}
                >
                  {chapter}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {isSearchMode && (
          <SearchDropdown
            navMode={navMode}
            filteredBooks={filteredBooks}
            searchSelectedBook={searchSelectedBook}
            onSelectBook={handleSelectSearchBook}
            onSelectChapter={handleSelectSearchChapter}
            onSelectVerse={handleSelectSearchVerse}
          />
        )}
      </AnimatePresence>

      <nav
        aria-label="Main navigation"
        className={cn(
          'flex items-center h-12 px-4',
          'bg-vintage-paper/90 backdrop-blur-md shadow-xl rounded-full',
          'text-vintage-ink',
        )}
      >
        {isSearchMode ? (
          <div className="flex items-center gap-2 min-w-[240px]">
            <Search
              className="size-4 shrink-0 text-vintage-ink/50"
              aria-hidden="true"
            />
            <input
              ref={inputRef}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={
                navMode === 'search-books'
                  ? 'Search books...'
                  : navMode === 'search-chapters'
                    ? `${searchSelectedBook?.name} - chapter...`
                    : 'Select verse...'
              }
              className={cn(
                'grow bg-transparent text-vintage-ink placeholder:text-vintage-ink/40',
                'text-sm font-sans outline-none min-w-0',
              )}
            />
            <button
              type="button"
              onClick={handleCancelSearch}
              className={cn(
                'flex items-center justify-center size-7 rounded-full shrink-0',
                'hover:bg-vintage-gold/20',
              )}
              aria-label="Close search"
            >
              <X
                className="size-4"
                aria-hidden="true"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className={cn(
                'flex items-center justify-center size-9 rounded-full',
                'hover:bg-vintage-gold/20',
                isHome && 'text-vintage-gold',
              )}
              aria-label="Home"
              aria-current={isHome ? 'page' : undefined}
            >
              <Home
                className="size-5"
                aria-hidden="true"
              />
            </Link>

            <button
              type="button"
              onClick={() => {
                setShowChapterSelect(false);
                setShowBooks((prev) => !prev);
              }}
              className={cn(
                'flex items-center justify-center size-9 rounded-full',
                'hover:bg-vintage-gold/20',
                isBooks && 'text-vintage-gold',
              )}
              aria-label="Books"
            >
              <BookOpen
                className="size-5"
                aria-hidden="true"
              />
            </button>

            {currentBookSlug && currentChapter && currentChapterCount && (
              <button
                type="button"
                onClick={() => {
                  setShowBooks(false);
                  setShowChapterSelect((prev) => !prev);
                }}
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-1.5',
                  'text-xs font-sans font-semibold',
                  'bg-vintage-gold/20 text-vintage-ink',
                  'hover:bg-vintage-gold/30',
                )}
              >
                Ch. {currentChapter}
              </button>
            )}

            <button
              type="button"
              onClick={handleStartSearch}
              className={cn('flex items-center justify-center size-9 rounded-full', 'hover:bg-vintage-gold/20')}
              aria-label="Search"
            >
              <Search
                className="size-5"
                aria-hidden="true"
              />
            </button>

            <button
              type="button"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className={cn('flex items-center justify-center size-9 rounded-full', 'hover:bg-vintage-gold/20')}
              aria-label={viewMode === 'grid' ? 'Switch to list view' : 'Switch to grid view'}
            >
              {viewMode === 'grid' ? (
                <List
                  className="size-5"
                  aria-hidden="true"
                />
              ) : (
                <Grid3X3
                  className="size-5"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

interface SearchDropdownProps {
  navMode: string;
  filteredBooks: readonly { id: string; name: string; slug: string; testament: string; chapterCount: number }[];
  searchSelectedBook: { slug: string; name: string; chapterCount: number } | null;
  onSelectBook: (book: { slug: string; name: string; chapterCount: number }) => void;
  onSelectChapter: (chapter: number) => void;
  onSelectVerse: (verse: number) => void;
}

function SearchDropdown({
  navMode,
  filteredBooks,
  searchSelectedBook,
  onSelectBook,
  onSelectChapter,
  onSelectVerse,
}: SearchDropdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ ...springSnappy }}
      className={cn(
        'absolute bottom-14 left-1/2 -translate-x-1/2',
        'w-72 max-h-80 overflow-y-auto p-2',
        'bg-vintage-paper/95 backdrop-blur-md shadow-xl rounded-2xl',
        '[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-vintage-border/40',
      )}
    >
      {navMode === 'search-books' && (
        <>
          {filteredBooks.length === 0 && <p className="py-4 text-center text-sm text-vintage-ink/50">No books found</p>}
          {filteredBooks.map((book) => (
            <button
              key={book.id}
              type="button"
              onClick={() => onSelectBook(book)}
              className={cn(
                'flex items-center justify-between w-full px-3 py-2.5 rounded-lg',
                'text-left',
                'hover:bg-vintage-gold/10',
              )}
            >
              <span className="text-sm font-serif text-vintage-ink">{book.name}</span>
              <span className="text-xs font-sans text-vintage-ink/40">{book.chapterCount} ch.</span>
            </button>
          ))}
        </>
      )}

      {navMode === 'search-chapters' && searchSelectedBook && (
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: searchSelectedBook.chapterCount }, (_, i) => i + 1).map((chapter) => (
            <button
              key={chapter}
              type="button"
              onClick={() => onSelectChapter(chapter)}
              className={cn(
                'flex items-center justify-center size-10 rounded-lg',
                'text-sm font-sans',
                'text-vintage-ink/60 hover:bg-vintage-gold/10 hover:text-vintage-ink',
              )}
            >
              {chapter}
            </button>
          ))}
        </div>
      )}

      {navMode === 'search-verses' && (
        <div className="grid grid-cols-5 gap-1.5">
          {Array.from({ length: 40 }, (_, i) => i + 1).map((verse) => (
            <button
              key={verse}
              type="button"
              onClick={() => onSelectVerse(verse)}
              className={cn(
                'flex items-center justify-center size-10 rounded-lg',
                'text-sm font-sans',
                'text-vintage-ink/60 hover:bg-vintage-gold/10 hover:text-vintage-ink',
              )}
            >
              {verse}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
