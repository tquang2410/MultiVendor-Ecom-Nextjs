import 'server-only'
import { createCallerFactory, createTRPCContext } from './init'
import { appRouter } from './routers/_app'

/**
 * This is the server-side tRPC client that can be used in React Server Components
 * to make direct calls to your tRPC procedures.
 */
export const api = createCallerFactory(appRouter)(createTRPCContext)
