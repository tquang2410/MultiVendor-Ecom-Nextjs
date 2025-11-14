import { Skeleton } from '@/components/ui/skeleton'

/**
 * AC-2.5: Fallback UI cho <Suspense> khi FeaturedProducts đang load.
 * Hiển thị 8 skeleton cards.
 */
export function FeaturedProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {/* Lặp 8 lần để tạo 8 skeleton */}
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            {/* Skeleton cho Image */}
            <Skeleton className="h-[180px] w-full rounded-xl" />
            <div className="space-y-2">
              {/* Skeleton cho Title */}
              <Skeleton className="h-4 w-3/4" />
              {/* Skeleton cho Price */}
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
    </div>
  )
}