import type { Metadata, Viewport } from 'next';

import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';

import { dehydrate } from '@tanstack/react-query';

import { Providers } from '@/components/core/providers';
import { Scripts } from '@/components/core/scripts';

import { getQueryClient } from '@/lib/client';
import { env } from '@/lib/env';
import { cn } from '@/lib/utils';

import '@/app/globals.css';

const sans = Geist({
  display: 'swap',
  variable: '--font-sans',
  weight: ['500', '700'],
  subsets: ['latin'],
});

const mono = Geist_Mono({
  display: 'swap',
  variable: '--font-mono',
  weight: ['500', '700'],
  subsets: ['latin'],
});

const serif = Playfair_Display({
  display: 'swap',
  variable: '--font-serif',
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(env.SITE_URL),
  title: {
    default: 'Project Bible',
    template: '%s | Project Bible',
  },
  description: 'Explore the Bible through beautifully crafted vintage trading cards.',
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Project Bible',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

function RootLayout({ children }: LayoutProps<'/'>) {
  const client = getQueryClient();
  const dehydratedState = dehydrate(client);

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(
          sans.variable,
          mono.variable,
          serif.variable,
          'flex flex-col h-[100dvh] overflow-hidden',
          'font-sans antialiased',
        )}
        style={{
          paddingTop: 'env(safe-area-inset-top)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingLeft: 'env(safe-area-inset-left)',
          paddingRight: 'env(safe-area-inset-right)',
        }}
      >
        <Providers dehydratedState={dehydratedState}>
          <main className="relative grow min-h-0 overflow-hidden">{children}</main>
          <Scripts />
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;
