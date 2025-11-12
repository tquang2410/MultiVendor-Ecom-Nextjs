'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import { useState } from 'react'
import superjson from 'superjson'
import { makeQueryClient } from './query-client'
import { trpc } from './react' // Import the trpc instance

function getUrl() {
  const base = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_APP_URL
  return `${base}/api/trpc`
}

export function TRPCReactProvider(props: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          transformer: superjson,
          url: getUrl(),
        }),
      ],
    }),
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
    </trpc.Provider>
  )
}