'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Media, Product } from '@/payload-types'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  // Lấy ảnh đầu tiên từ collection Media
  const image = product.images?.[0] as Media | undefined
  const imageUrl = image?.url ?? null

  // Format giá tiền
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(product.price)

  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-md">
        <CardContent className="p-0">
          <AspectRatio ratio={4 / 3}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              // Fallback nếu không có ảnh
              <div className="flex items-center justify-center h-full bg-secondary">
                <Skeleton className="h-full w-full" />
              </div>
            )}
          </AspectRatio>
        </CardContent>
        <CardFooter className="flex flex-col items-start p-4">
          <h3 className="text-md font-semibold truncate w-full">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {/* Tên Vendor (nếu có) - Tạm thời ẩn */}
          </p>
          <p className="text-lg font-bold text-primary mt-1">
            {formattedPrice}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}