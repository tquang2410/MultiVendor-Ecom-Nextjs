import { Suspense } from 'react' // << IMPORT MỚI
import { Hero } from './_components/hero'
import { SearchFilters } from './search-filters'
import { FeaturedProducts } from './_components/featured-products' // << IMPORT MỚI
import { FeaturedProductsSkeleton } from './_components/featured-products-skeleton' // << IMPORT MỚI

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <SearchFilters />

      {/* 👇 KHỐI MỚI (AC-2.4) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Sản phẩm Mới nhất
        </h2>
        <Suspense fallback={<FeaturedProductsSkeleton />}>
          <FeaturedProducts />
        </Suspense>
      </section>
    </div>
  )
}