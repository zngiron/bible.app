# Frontend.dev

## Tech Stack

Next.js 16 (App Router), React 19 + React Compiler, TypeScript (strict), Tailwind CSS v4 (OKLCH), shadcn/ui (New York), Biome, Zustand, TanStack React Query, Zod, React Hook Form, motion/react, Sonner, date-fns, Pino, Playwright (future).

## Commands

```bash
bun run dev        # Start dev server
bun run build      # Production build
bun run lint       # Biome check
bun run format     # Biome format --write
```

## Directory Tree

```
src/
├── app/                        # App Router (pages, layouts, loading, error)
├── components/
│   ├── common/                 # Shared reusable components
│   ├── core/                   # Providers, scripts, error boundaries
│   ├── layout/                 # Header, footer, sidebar, navigation
│   └── ui/                     # shadcn/ui (never modify directly)
├── data/
│   ├── api/                    # Pure API functions + domain types
│   ├── static/                 # Static/constant data by domain
│   └── stores/                 # Zustand stores per domain
├── hooks/                      # Custom hooks + React Query hooks
└── lib/                        # Utilities (client, env, logger, request, utils)
tests/                          # Playwright tests (future)
```

Route groups only when needed (shared layouts, auth grouping). Never a generic `(routes)/` wrapper.

## File Naming

| File Type | Convention | Example |
|-----------|-----------|---------|
| Components | kebab-case, type-first | `button-submit.tsx`, `card-user.tsx` |
| Hooks | `[exportName].hook.ts` | `useAuth.hook.ts`, `usePosts.hook.ts` |
| Stores | `[domain].store.ts` | `layout.store.ts` |
| API | `[domain].ts` | `users.ts`, `products.ts` |
| Static data | `[domain].ts` in `data/static/` | `navigation.ts`, `countries.ts` |
| Lib utilities | kebab-case | `format-date.ts` |

## Symbol Naming

| Symbol | Convention | Example |
|--------|-----------|---------|
| Components | PascalCase | `ButtonSubmit` |
| Hooks | camelCase + `use` | `useAuth` |
| Stores | camelCase + `use` + `Store` | `useLayoutStore` |
| Interfaces/Types | PascalCase | `UserCardProps`, `Status` |
| Constants | camelCase | `maxRetries` |
| Functions/vars | camelCase | `formatDate`, `isLoading` |

## Types — Co-locate With Data

No `@/types/` folder. Types live next to the code that owns them:

- Domain types (User, Product) → `@/data/api/[domain].ts`
- Component props → in the component file
- Store types → in the store file

## Path Aliases

Always `@/` aliases — never relative imports (`../`, `./`):

`@/components/*`, `@/lib/*`, `@/hooks/*`, `@/data/api/*`, `@/data/static/*`, `@/data/stores/*`

## Import Order (Biome-enforced)

```tsx
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import type { User } from '@/data/api/users';

import { Suspense } from 'react';
import Image from 'next/image';

import { useQuery } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

import { useUsers } from '@/hooks/useUsers.hook';
import { useLayoutStore } from '@/data/stores/layout.store';
```

Groups: type imports → React/Next → packages → `@/components` → `@/lib` → `@/hooks` + `@/data`. Blank line between each group.

**Never import React** — Next.js auto-imports it. Never use `React.XXX` — import types/hooks by name.

## File Organization

Single file per component, in order: type imports → dependency imports → local interfaces → constants → helpers → component export(s).

---

# Code Principles

- **Small functions** — each function does one thing. Extract when logic is reusable or a block exceeds ~20 lines.
- **Meaningful naming** — names reveal intent. No abbreviations, no generic names (`data`, `info`, `temp`, `handle`).
- **Standardized patterns** — follow the conventions in this file consistently. Same problem → same solution every time.
- **Flat over nested** — early returns, guard clauses, and ternaries over deep `if/else` chains.
- **Delete dead code** — no commented-out code, unused imports, or unreachable branches.

---

# TypeScript Style

## Strict Rules

- **No `any`** — use `unknown` + type guards
- **No `as` assertions** — use type guards, generics, or `satisfies`
- **No `!` non-null assertions** — handle nullability explicitly
- **No `enum`** — use `as const` objects or union types
- **No `namespace`** — use ES modules
- **No JSDoc** — self-documenting code with descriptive names
- **No explicit return types** — let TypeScript infer. Annotate only when inference is insufficient.
- **All exported functions must be pure** — no side effects. Side effects live in hooks.

## Interface vs Type

`interface` for object shapes, props, API responses. `type` for unions, intersections, mapped types:

```tsx
interface UserCardProps {
  user: User;
  isCompact?: boolean;
  onSelect: (id: string) => void;
}

type Status = 'active' | 'inactive' | 'pending';
```

## Enum Alternatives

```tsx
const status = { active: 'active', inactive: 'inactive', pending: 'pending' } as const;
type Status = (typeof status)[keyof typeof status];
```

## Type Imports

Always `import type` for type-only imports.

## Function Signatures

Named `interface` for 3+ params. 1-2 primitives inline. Function declarations for components, arrow functions for local handlers.

## Code Style (Biome)

2-space indent, single quotes, 120 char width, trailing commas, semicolons.

## Zod for Runtime Validation

```tsx
const userSchema = z.object({ id: z.string(), name: z.string().min(1), email: z.email() });
type User = z.infer<typeof userSchema>;
```

## Nullability

Use optional chaining (`?.`), nullish coalescing (`??`), and explicit checks. Never `!` assertions.

---

# React Components

## Declaration

Named exports + function declarations. Never default exports (except App Router files), never arrow function components:

```tsx
export function UserProfile({ user }: UserProfileProps) {
  return <div>{user.name}</div>;
}
```

## Props

- Define with `interface`, destructure in signature, provide defaults inline
- Callback props: `on` prefix (`onSelect`, `onChange`)
- Internal handlers: `handle` prefix (`handleClick`, `handleSubmit`)
- Booleans: `is`/`has`/`should` prefix (`isLoading`, `hasError`)

## Early Returns

Reduce nesting — return early for guard clauses (`if (!user) return null;`).

## Composition

- Prefer composition over prop drilling
- Use `children` and render props
- Extend shadcn/ui via composition, never modify source
- Reusable logic → `@/hooks`, domain types → `@/data/api/`

## Accessibility (WCAG 2.1 AAA)

- `<button>` for actions, `<a>` for navigation — never `<div onClick>`
- Semantic elements: `<nav>`, `<main>`, `<section>`, `<article>`
- Proper heading hierarchy: `h1` → `h2` → `h3`, never skip
- All interactive elements keyboard accessible (`Tab`, `Enter`, `Space`, `Escape`)
- Trap focus in modals, return focus on close
- `aria-label` on icon-only buttons, `aria-hidden="true"` on decorative icons
- `aria-describedby` for supplementary descriptions, `aria-live` for dynamic updates
- Normal text contrast: 7:1 (AAA), large text: 4.5:1. Never rely solely on color.

---

# React State and Data Fetching

## Three-Tier State Model

| Tier | Tool | Use For |
|------|------|---------|
| Local | `useState` / `useReducer` | Form inputs, toggles, component-specific UI |
| Global UI | Zustand (`@/data/stores/`) | Theme, modals, sidebar, UI preferences |
| Server | React Query (`@/hooks/` + `@/data/api/`) | API data, caching, synchronization |

Never cache server data in Zustand. Never use React Query for client-only UI state.

## Zustand — Global UI State

One flat store per domain. Separate `State` and `Actions` interfaces. Naming: `use[Domain]Store`, file: `[domain].store.ts`. Pattern: see `@/data/stores/layout.store.ts`.

## React Query — Server State

**Pure functions + hooks separation:** API functions (`@/data/api/`) are pure — no side effects, no caching, no toasts. Side effects (caching, invalidation, toasts) live exclusively in hooks (`@/hooks/`).

Architecture: `@/data/api/[domain].ts` (pure API functions) → `@/hooks/use[Domain].hook.ts` (query/mutation hooks) → component.

```tsx
// @/data/api/users.ts — pure, no side effects
export function getUsers(): Promise<User[]> {
  return request<User[]>({ method: RequestMethod.GET, endpoint: '/users' });
}

export function createUser(input: CreateUserInput): Promise<User> {
  return request<User>({ method: RequestMethod.POST, endpoint: '/users', params: input });
}

// @/hooks/useUsers.hook.ts — side effects live here
export function useUsers() {
  return useQuery({ queryKey: ['users'], queryFn: getUsers });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created');
    },
    onError: (error) => toast.error(error.message),
  });
}
```

### Query Keys

Arrays, nested hierarchically: `['users']`, `['users', id]`, `['users', userId, 'posts']`. Include all variables the query depends on.

### Best Practices

- Always handle `onError` in `useMutation` with `toast.error()`
- Use `enabled` for conditional fetching, `select` for data transformation
- Use `getQueryClient()` from `@/lib/client`

## Error Handling

- Async errors → `toast.error()` (Sonner)
- Form validation → inline via React Hook Form + Zod
- Server errors → log with `@/lib/logger`, toast to user
- Never expose raw error messages

---

# Next.js Patterns

## Prop Helpers

Use auto-generated `PageProps` and `LayoutProps` — never manually type page/layout props:

```tsx
export default function Page(_: PageProps<'/'>) {
  return <div>Home</div>;
}
```

## Async Params (Next.js 15+)

`params` and `searchParams` are **Promises** — always `await` them. `children` is not a Promise.

```tsx
export default async function Page({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  return <article>{slug}</article>;
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  return { title: `Blog - ${slug}` };
}
```

Pages/layouts without dynamic segments don't need `async`.

## Default Exports — App Router Exception

App Router requires default exports for `page.tsx`, `layout.tsx`, `error.tsx`, `loading.tsx`, `not-found.tsx`. This is the **only** exception to named-exports-only.

## Server vs Client Components

Default to Server Components. Add `'use client'` only for event handlers, React hooks, Browser APIs, or client libraries (motion/react, react-hook-form). Push `'use client'` as deep as possible — wrap only the interactive leaf.

## App Router Files

| File | Purpose |
|------|---------|
| `page.tsx` | Route entry (Server Component) |
| `layout.tsx` | Persistent layout (Server Component) |
| `loading.tsx` | Suspense fallback |
| `error.tsx` | Error boundary (`'use client'` required) |
| `not-found.tsx` | 404 UI |
| `route.ts` | API handler |

## Metadata

Static: `export const metadata: Metadata = { title: 'Home', description: '...' };`
Dynamic: use `async generateMetadata` with `await params`.

## Error Boundaries

Every meaningful route segment has `error.tsx`. Requires `'use client'`. Log with `@/lib/logger`, never expose raw errors. Provide a `reset` button.

## Loading States

Use `loading.tsx` for routes, `<Suspense>` for components. Show skeleton UIs, never blank screens.

## Environment Variables

Access exclusively through `@/lib/env` (Zod-validated). Never `process.env` directly. Client vars prefixed `NEXT_PUBLIC_`.

## Performance

- `next/Image` with `width`/`height` or `fill` — never `<img>`
- `next/font` for fonts, `next/dynamic` for lazy-loading
- `<Suspense>` for streaming, `@next/third-parties` for scripts
- Minimize `'use client'` boundaries

---

# Tailwind CSS

## v4 Configuration

CSS-based config (no `tailwind.config.js`): `@import 'tailwindcss'`, `@import 'tw-animate-css'`, `@theme inline`, `@custom-variant dark`. OKLCH color system.

## Semantic Tokens

Always semantic tokens — never hardcoded colors. Available: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `sidebar-*`, `chart-1`–`chart-5`.

## cn() Utility

Use `cn()` from `@/lib/utils` when classes span multiple categories or are conditional. Single-category classes use plain `className`:

```tsx
<div className="flex items-center gap-4" />                    // single category — plain
<div className={cn('flex items-center gap-4', 'bg-muted')} />  // multiple categories — cn()
<div className={cn('p-4', isActive && 'bg-primary')} />        // conditional — cn()
```

## Class Organization Order

When using `cn()`, one string per category:

1. Root/Group — `container`, `group`
2. Overflow/Visibility — `overflow-*`, `opacity-*`
3. Position + Z — `relative`, `absolute`, `z-*`
4. Display + Box — `flex`, `grid`, `w-*`, `h-*`, `gap-*`, `p-*`, `m-*`, `border`, `rounded-*`
5. Background + Type — `bg-*`, `text-*`, `font-*`
6. Animation/Transition — `animate-*`, `transition-*`
7. Interactivity — `cursor-*`, `pointer-events-*`
8. Responsive — `sm:`, `md:`, `lg:`
9. Dark — `dark:`

## Styling Rules

- Tailwind utilities only — never inline `style` or `<style>` tags
- Standard utilities over arbitrary values (`p-4` not `p-[17px]`)
- `@apply` only for base resets in globals.css
- `size-*` when width = height: `size-4` not `w-4 h-4`

## Color Contrast (WCAG AAA)

Normal text: **7:1**, large text: **4.5:1**, UI components: **3:1**. Never rely solely on color.

## Responsive

Mobile-first — base for mobile, breakpoints up.

## Dark Mode

Semantic tokens auto-swap. Use `dark:` only for edge cases where tokens are insufficient.

---

# shadcn/ui

## Configuration

Style: New York. Icons: lucide-react. Components: `@/components/ui/`. Add via `bunx shadcn@latest add [component]`.

## Usage Rules

- Import from `@/components/ui/[component]`
- Never modify `@/components/ui/` files — customize via `className` + `cn()`
- Use built-in variants, don't add custom variants to source files
- Composition wrappers go in `@/components/common/`

## Forms — Field + Controller + Zod

- `Field` wrapper (supports `orientation="horizontal"` / `"responsive"`)
- `FieldLabel` (with `htmlFor`), `FieldDescription`, `FieldError` (accepts `errors` array)
- `FieldGroup` for stacking, `FieldSet` / `FieldLegend` for semantic grouping
- Zod schema above component, type via `z.infer<typeof schema>`
- `zodResolver` for validation, `Controller` (not old `FormField`)
- `data-invalid={fieldState.invalid}` on `Field`, `aria-invalid` on input
- `FieldError` only when `fieldState.invalid`
- `defaultValues` for all fields, `field.name` as `id`/`htmlFor`

## Toasts — Sonner

```tsx
toast.success('Changes saved');
toast.error('Failed to save', { description: 'File exceeds 5MB limit' });
toast.promise(saveChanges(), { loading: 'Saving...', success: 'Saved', error: 'Failed' });
```

## Icons — Lucide

Import individually. Sizes: `size-3` (12px), `size-4` (16px), `size-5` (20px), `size-6` (24px). Always `aria-hidden="true"` on decorative icons, `aria-label` on icon-only buttons.

---

# Animation

## Core Principle

**Tailwind = how things look. motion/react = how things move.**

motion/react handles every transition, hover, entrance, exit, gesture, and scroll animation. No `transition-*` or `animate-*` in custom components (shadcn/ui uses `tw-animate-css` internally — don't use it elsewhere).

## Spring Presets

| Preset | Config | Use For |
|--------|--------|---------|
| Snappy | `stiffness: 400, damping: 30` | Buttons, toggles, micro-interactions |
| Smooth | `stiffness: 300, damping: 30` | Cards, panels, modals |
| Gentle | `stiffness: 200, damping: 25` | Page transitions, large elements |
| Bouncy | `bounce: 0.3, duration: 0.6` | Playful elements, notifications |

Duration-based only for pure opacity fades (150-250ms, `easeOut`).

## Reduced Motion

Always respect `prefers-reduced-motion` via `useReducedMotion()` — remove movement, keep opacity.

## Performance

- Animate only `transform` and `opacity` (GPU-accelerated)
- Use `layout` prop instead of animating width/height
- `viewport={{ once: true }}` for one-shot reveals
- Stagger only visible items. Nothing should exceed 500ms.

---

# External Libraries

## Approved

**Core:** next, react, react-dom, typescript
**Styling:** tailwindcss, tw-animate-css, class-variance-authority, clsx, tailwind-merge
**UI:** shadcn/ui, lucide-react
**State/Data:** zustand, @tanstack/react-query, zod
**Animation:** motion/react
**Forms:** react-hook-form, @hookform/resolvers
**Utilities:** sonner, date-fns, next-themes, qs, pino, @next/third-parties
**Testing:** @playwright/test, @axe-core/playwright
**Tooling:** @biomejs/biome, lefthook, @commitlint/cli

## Adding Dependencies

1. Check native APIs first (`Intl`, `URL`, `fetch`, `structuredClone`, `crypto.randomUUID()`)
2. Check if an approved library covers it
3. Evaluate bundle size (prefer tree-shakeable)
4. Verify React 19 / Next.js 16 compatibility

## Banned

| Don't Use | Use Instead |
|-----------|-------------|
| moment.js | date-fns |
| lodash (full) | Native or lodash-es |
| axios | `@/lib/request` |
| styled-components/emotion | Tailwind CSS |
| Redux/MobX | Zustand + React Query |
| jQuery | React APIs |
| classnames | clsx + tailwind-merge |
| GSAP | motion/react |
| Lenis/smooth-scroll | motion/react `useScroll` |
| framer-motion | motion/react |

Always specific imports — never `import *`.

---

# Testing (Future)

**Stack:** @playwright/test + @axe-core/playwright. Tests in `tests/` — name by feature (`auth.spec.ts`) or page (`dashboard.spec.ts`).

**Selectors:** ARIA roles > labels > placeholder > text > test IDs. Never CSS selectors or XPath.

**Principles:** Test behavior not implementation. Isolated tests, no shared state. Arrange-Act-Assert. No hardcoded waits. Descriptive names (`should show error with invalid credentials`).

**Accessibility:** Run `@axe-core/playwright` with `wcag2aaa` tags on every critical page.
