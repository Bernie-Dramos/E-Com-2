import Link from "next/link"
import Image from "next/image"
import type { Product } from "../types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/produto/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover gold-border border-opacity-0 hover:border-opacity-100">
        <div className="relative h-64 bg-gray-50">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          {product.condition && (
            <div className="absolute top-2 right-2">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  product.condition === "novo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                }`}
              >
                {product.condition === "novo" ? "Novo" : "Usado"}
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold gold-text">{product.price.toLocaleString()} MZN</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{product.originalPrice.toLocaleString()} MZN</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
