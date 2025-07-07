"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CarrinhoPage() {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const handleWhatsAppOrder = () => {
    if (items.length === 0) return

    setIsLoading(true)

    const orderDetails = items
      .map((item) => `• ${item.name} (Qtd: ${item.quantity}) - ${(item.price * item.quantity).toLocaleString()} MZN`)
      .join("\n")

    const message = `Olá! Estou interessado nestes produtos para compra:\n\n${orderDetails}\n\nTotal: ${total.toLocaleString()} MZN\n\nPor favor, confirme a disponibilidade e o processo de pagamento.`

    const whatsappUrl = `https://wa.me/258841234567?text=${encodeURIComponent(message)}`

    setTimeout(() => {
      window.open(whatsappUrl, "_blank")
      setIsLoading(false)
    }, 1000)
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4 font-playfair">Seu carrinho está vazio</h1>
        <p className="text-gray-600 mb-8">Adicione alguns produtos incríveis ao seu carrinho para continuar.</p>
        <a href="/eletronicos" className="btn-gold mr-4">
          Ver Eletrônicos
        </a>
        <a href="/roupas-femininas" className="btn-gold">
          Ver Roupas Femininas
        </a>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 font-playfair">
        Meu <span className="gold-text">Carrinho</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size}-${item.color}`}
              className="bg-white rounded-lg shadow-md p-6 gold-border border-opacity-20"
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    {item.size && <p>Tamanho: {item.size}</p>}
                    {item.color && <p>Cor: {item.color}</p>}
                    {item.condition && <p>Condição: {item.condition === "novo" ? "Novo" : "Usado"}</p>}
                  </div>
                  <p className="font-bold gold-text mt-2">{item.price.toLocaleString()} MZN</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity - 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(`${item.id}-${item.size}-${item.color}`, item.quantity + 1)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(`${item.id}-${item.size}-${item.color}`)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 gold-border border-opacity-20 sticky top-24">
            <h2 className="text-xl font-bold mb-6 font-playfair">Resumo do Pedido</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-medium">{total.toLocaleString()} MZN</span>
              </div>
              <div className="flex justify-between">
                <span>Entrega:</span>
                <span className="font-medium">Grátis</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="gold-text">{total.toLocaleString()} MZN</span>
                </div>
              </div>
            </div>

            <button onClick={handleWhatsAppOrder} disabled={isLoading} className="w-full btn-gold mb-4">
              {isLoading ? "Preparando..." : "Enviar Pedido via WhatsApp"}
            </button>

            <button
              onClick={clearCart}
              className="w-full py-3 px-6 border border-gray-300 rounded-lg font-medium hover:border-yellow-400 transition-colors"
            >
              Limpar Carrinho
            </button>

            <div className="mt-6 text-sm text-gray-600">
              <p className="mb-2">✓ Entrega grátis em Maputo</p>
              <p className="mb-2">✓ Pagamento na entrega</p>
              <p>✓ Garantia de qualidade</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
