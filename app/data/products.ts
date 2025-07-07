import type { Product } from "../types/product"

export const products: Product[] = [
  // Electronics
  {
    id: "1",
    name: "iPhone 14 Pro Max",
    description: "Smartphone Apple com câmera profissional e tela Super Retina XDR",
    price: 85000,
    originalPrice: 95000,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "novo",
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Samsung Galaxy S23 Ultra",
    description: "Smartphone Samsung com S Pen e câmera de 200MP",
    price: 75000,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "usado",
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "MacBook Air M2",
    description: "Laptop Apple com chip M2, 8GB RAM e 256GB SSD",
    price: 120000,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "novo",
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "PlayStation 5",
    description: "Console de jogos Sony com SSD ultra-rápido",
    price: 65000,
    originalPrice: 70000,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "novo",
    inStock: true,
  },
  {
    id: "5",
    name: "AirPods Pro 2ª Geração",
    description: "Fones de ouvido sem fio com cancelamento de ruído",
    price: 18000,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "novo",
    inStock: true,
  },
  {
    id: "6",
    name: "JBL Charge 5",
    description: "Caixa de som Bluetooth portátil à prova d'água",
    price: 8500,
    image: "/placeholder.svg?height=400&width=400",
    category: "electronics",
    condition: "usado",
    inStock: true,
  },

  // Women's Clothing
  {
    id: "7",
    name: "Vestido Elegante Dourado",
    description: "Vestido de festa com detalhes dourados e corte moderno",
    price: 4500,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Dourado", "Preto", "Branco"],
    inStock: true,
    featured: true,
  },
  {
    id: "8",
    name: "Blusa de Seda Premium",
    description: "Blusa feminina de seda natural com acabamento luxuoso",
    price: 3200,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    sizes: ["P", "M", "G"],
    colors: ["Branco", "Nude", "Preto"],
    inStock: true,
    featured: true,
  },
  {
    id: "9",
    name: "Saia Midi Plissada",
    description: "Saia midi com pregas elegantes, perfeita para ocasiões especiais",
    price: 2800,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Marinho", "Bege"],
    inStock: true,
  },
  {
    id: "10",
    name: "Conjunto Blazer e Calça",
    description: "Conjunto executivo feminino com blazer e calça social",
    price: 6500,
    originalPrice: 7500,
    image: "/placeholder.svg?height=400&width=400",
    category: "clothing",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Cinza", "Marinho"],
    inStock: true,
  },
]

export const getProductsByCategory = (category: "electronics" | "clothing") => {
  return products.filter((product) => product.category === category)
}

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured)
}

export const getProductById = (id: string) => {
  return products.find((product) => product.id === id)
}
