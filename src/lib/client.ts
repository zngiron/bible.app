import { cache } from 'react';

import { isServer, QueryClient } from '@tanstack/react-query';

function getDefaultOptions() {
  return {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  };
}

function createQueryClient() {
  return new QueryClient({
    defaultOptions: getDefaultOptions(),
  });
}

const getServerQueryClient = cache(createQueryClient);

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (isServer) {
    return getServerQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = createQueryClient();
  }

  return browserQueryClient;
}
