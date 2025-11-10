import { baseProcedure, createTRPCRouter } from '@/trpc/init'

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const { db } = ctx

    const results = await db.find({
      collection: 'products',
      depth: 1,
      limit: 10,
    })

    return results
  }),
})
