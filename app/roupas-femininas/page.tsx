"use client"

import { useState } from "react"
import { Filter, Grid, List } from "lucide-react"
import ProductCard from "../components/ProductCard"
import { getProductsByCategory } from "../data/products"

export default function RoupasFemininasPage() {
  const [sortBy, setSortBy] = useState("name")
  const [sizeFilter, setSizeFilter] = useState("all")
  const [colorFilter, setColorFilter] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const clothing = getProductsByCategory("clothing")

  const filteredProducts = clothing
    .filter((product) => {
      if (sizeFilter !== "all" && !product.sizes?.includes(sizeFilter)) return false
      if (colorFilter !== "all" && !product.colors?.includes(colorFilter)) return false
      return true
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  const allSizes = Array.from(new Set(clothing.flatMap((p) => p.sizes || [])))
  const allColors = Array.from(new Set(clothing.flatMap((p) => p.colors || [])))

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
          Roupas <span className="gold-text">Femininas</span>
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Explore nossa coleção exclusiva de roupas femininas elegantes e sofisticadas, perfeitas para todas as
          ocasiões.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex flex-wrap items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={sizeFilter}
              onChange={(e) => setSizeFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">Todos os Tamanhos</option>
              {allSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">Todas as Cores</option>
            {allColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="name">Ordenar por Nome</option>
            <option value="price-low">Menor Preço</option>
            <option value="price-high">Maior Preço</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${viewMode === "list" ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-600"}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${
          viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        }`}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
        </div>
      )}
    </div>
  )
}
