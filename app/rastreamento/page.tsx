"use client"

import type React from "react"

import { useState } from "react"
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react"
import { getOrderById } from "../data/orders"
import type { Order } from "../types/product"

export default function RastreamentoPage() {
  const [orderId, setOrderId] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setIsSearching(true)
    setNotFound(false)

    setTimeout(() => {
      const foundOrder = getOrderById(orderId.trim())
      if (foundOrder) {
        setOrder(foundOrder)
        setNotFound(false)
      } else {
        setOrder(null)
        setNotFound(true)
      }
      setIsSearching(false)
    }, 1000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pendente":
        return <Clock className="w-6 h-6 text-yellow-500" />
      case "confirmado":
        return <Package className="w-6 h-6 text-blue-500" />
      case "enviado":
        return <Truck className="w-6 h-6 text-purple-500" />
      case "entregue":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      default:
        return <Clock className="w-6 h-6 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pendente":
        return "Pedido Pendente"
      case "confirmado":
        return "Pedido Confirmado"
      case "enviado":
        return "Pedido Enviado"
      case "entregue":
        return "Pedido Entregue"
      default:
        return "Status Desconhecido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-yellow-100 text-yellow-800"
      case "confirmado":
        return "bg-blue-100 text-blue-800"
      case "enviado":
        return "bg-purple-100 text-purple-800"
      case "entregue":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-playfair">
            <span className="gold-text">Rastreamento</span> de Pedido
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Digite o número do seu pedido para acompanhar o status da entrega.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 gold-border border-opacity-20 mb-8">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                Número do Pedido
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Ex: 1234"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors"
                required
              />
            </div>
            <div className="md:pt-7">
              <button
                type="submit"
                disabled={isSearching}
                className="w-full md:w-auto btn-gold flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>{isSearching ? "Buscando..." : "Rastrear Pedido"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Order Not Found */}
        {notFound && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-red-900 mb-2">Pedido não encontrado</h3>
            <p className="text-red-700">
              Não foi possível encontrar um pedido com o número informado. Verifique se o número está correto e tente
              novamente.
            </p>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-lg shadow-lg p-8 gold-border border-opacity-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold font-playfair">Pedido #{order.id}</h2>
                <p className="text-gray-600">Realizado em {new Date(order.date).toLocaleDateString("pt-BR")}</p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
                >
                  {getStatusText(order.status)}
                </span>
              </div>
            </div>

            {/* Progress Timeline */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-6">Status do Pedido</h3>
              <div className="flex items-center justify-between">
                {["pendente", "confirmado", "enviado", "entregue"].map((status, index) => {
                  const isActive = ["pendente", "confirmado", "enviado", "entregue"].indexOf(order.status) >= index
                  const isCurrent = order.status === status

                  return (
                    <div key={status} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          isActive
                            ? isCurrent
                              ? "bg-yellow-500 text-white"
                              : "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {getStatusIcon(status)}
                      </div>
                      <span className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                        {getStatusText(status)}
                      </span>
                      {index < 3 && (
                        <div
                          className={`hidden md:block absolute h-0.5 w-full top-6 left-1/2 ${
                            ["pendente", "confirmado", "enviado"].indexOf(order.status) > index
                              ? "bg-green-500"
                              : "bg-gray-200"
                          }`}
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Delivery Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Informações de Entrega</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Data estimada:</span>{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString("pt-BR")}
                  </p>
                  <p>
                    <span className="font-medium">Método:</span> Entrega expressa
                  </p>
                  <p>
                    <span className="font-medium">Endereço:</span> Maputo, Moçambique
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Resumo do Pedido</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Total de itens:</span> {order.items.length}
                  </p>
                  <p>
                    <span className="font-medium">Valor total:</span>{" "}
                    <span className="gold-text font-bold">{order.total.toLocaleString()} MZN</span>
                  </p>
                  <p>
                    <span className="font-medium">Pagamento:</span> Na entrega
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Itens do Pedido</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantidade: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{(item.price * item.quantity).toLocaleString()} MZN</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Support */}
            <div className="mt-8 pt-8 border-t">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Precisa de ajuda com seu pedido?</p>
                <a
                  href="https://wa.me/258841234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold inline-flex items-center space-x-2"
                >
                  <span>Falar com Suporte</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Sample Order IDs */}
        {!order && !notFound && (
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <h3 className="font-semibold text-gray-900 mb-3">Pedidos de Exemplo</h3>
            <p className="text-gray-600 mb-4">Experimente rastrear com estes números de pedido:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["1234", "5678", "9999"].map((id) => (
                <button
                  key={id}
                  onClick={() => setOrderId(id)}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-yellow-400 transition-colors"
                >
                  #{id}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
