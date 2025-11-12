import 'server-only'
import { createTRPCOptionsProxy } from '@trpc/tanstack-react-query'
import { cache } from 'react'
import { createTRPCContext } from './init'
import { makeQueryClient } from './query-client'
import { appRouter } from './routers/_app'
import superjson from 'superjson'

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  transformer: superjson,
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})