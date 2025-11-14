import { api } from '@/trpc/server'
import { ProductCard } from './product-card'

/**
 * Đây là React Server Component (RSC)
 * Gọi tRPC server để lấy 8 sản phẩm mới nhất và hiển thị.
 */
export async function FeaturedProducts() {
  const products = await api.products.getNewest()

  if (products.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Hiện chưa có sản phẩm nào.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}