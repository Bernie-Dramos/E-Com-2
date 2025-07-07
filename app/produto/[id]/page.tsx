"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Minus, Plus, Heart, Share2, Star } from "lucide-react"
import { getProductById } from "../../data/products"
import { useCart } from "../../context/CartContext"

export default function ProductDetailPage() {
  const params = useParams()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = getProductById(params.id as string)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
        <p className="text-gray-600">O produto que você está procurando não existe.</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
      condition: product.condition,
    })

    // Show success message (you could use a toast library here)
    alert("Produto adicionado ao carrinho!")
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden gold-border">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            {product.condition && (
              <div className="absolute top-4 right-4">
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${
                    product.condition === "novo" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {product.condition === "novo" ? "Novo" : "Usado"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">(4.8) 124 avaliações</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold gold-text">{product.price.toLocaleString()} MZN</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-500 line-through">{product.originalPrice.toLocaleString()} MZN</span>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Descrição</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selection */}
          {product.sizes && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Tamanho</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-gray-300 hover:border-yellow-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cor</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedColor === color
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                        : "border-gray-300 hover:border-yellow-400"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quantidade</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-50">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-50">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button onClick={handleAddToCart} className="w-full btn-gold" disabled={!product.inStock}>
              {product.inStock ? "Adicionar ao Carrinho" : "Fora de Estoque"}
            </button>

            <div className="flex space-x-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-6 border rounded-lg font-medium transition-colors ${
                  isWishlisted ? "border-red-500 bg-red-50 text-red-700" : "border-gray-300 hover:border-yellow-400"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                <span>Lista de Desejos</span>
              </button>

              <button className="flex items-center justify-center space-x-2 py-3 px-6 border border-gray-300 rounded-lg font-medium hover:border-yellow-400 transition-colors">
                <Share2 className="w-5 h-5" />
                <span>Compartilhar</span>
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="border-t pt-6">
            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">SKU:</span> DC-{product.id}
              </p>
              <p>
                <span className="font-medium">Categoria:</span>{" "}
                {product.category === "electronics" ? "Eletrônicos" : "Roupas Femininas"}
              </p>
              <p>
                <span className="font-medium">Disponibilidade:</span>{" "}
                {product.inStock ? "Em estoque" : "Fora de estoque"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
