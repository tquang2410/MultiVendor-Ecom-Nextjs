import { baseProcedure, createTRPCRouter } from '@/trpc/init'
import { TRPCError } from '@trpc/server'

export const productsRouter = createTRPCRouter({
  /**
   * Lấy 8 sản phẩm mới nhất để hiển thị trên trang chủ.
   * Đây là AC-1 của PRD (HOME-01).
   */
  getNewest: baseProcedure.query(async ({ ctx }) => {
    console.log('Backend: getNewest (Featured Products) procedure called')
    const { db } = ctx
    try {
      const { docs: products } = await db.find({
        collection: 'products',
        limit: 8,
        sort: '-createdAt', // Sắp xếp mới nhất trước
        depth: 1, // Populate `images`
      })
      console.log(`Backend: Found ${products.length} newest products.`)
      return products
    } catch (error) {
      console.error('Backend: Error in getNewest procedure:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to fetch newest products.',
      })
    }
  }),
})