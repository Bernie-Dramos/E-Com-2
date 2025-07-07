export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  category: "electronics" | "clothing"
  condition?: "novo" | "usado"
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured?: boolean
}

export interface Order {
  id: string
  status: "pendente" | "confirmado" | "enviado" | "entregue"
  date: string
  estimatedDelivery: string
  items: Array<{
    name: string
    quantity: number
    price: number
  }>
  total: number
}
