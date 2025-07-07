import type { Order } from "../types/product"

export const orders: Order[] = [
  {
    id: "1234",
    status: "enviado",
    date: "2024-01-10",
    estimatedDelivery: "2024-01-15",
    items: [
      { name: "iPhone 14 Pro Max", quantity: 1, price: 85000 },
      { name: "AirPods Pro 2ª Geração", quantity: 1, price: 18000 },
    ],
    total: 103000,
  },
  {
    id: "5678",
    status: "confirmado",
    date: "2024-01-12",
    estimatedDelivery: "2024-01-18",
    items: [{ name: "Vestido Elegante Dourado", quantity: 2, price: 4500 }],
    total: 9000,
  },
  {
    id: "9999",
    status: "entregue",
    date: "2024-01-05",
    estimatedDelivery: "2024-01-10",
    items: [{ name: "MacBook Air M2", quantity: 1, price: 120000 }],
    total: 120000,
  },
]

export const getOrderById = (id: string) => {
  return orders.find((order) => order.id === id)
}
