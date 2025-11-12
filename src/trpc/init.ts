import { initTRPC } from '@trpc/server'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import superjson from 'superjson'

export const createTRPCContext = cache(async (opts?: { req: Request }) => {
  const payload = await getPayload({ config: configPromise })
  return {
    db: payload,
    req: opts?.req,
  }
})

const t = initTRPC.context<typeof createTRPCContext._TYPE>().create({
  transformer: superjson,
})

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure