"use client"

import Link from "next/link"
import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl font-playfair">DC</span>
            </div>
            <span className="hidden md:block text-xl font-bold gold-text font-playfair">Dexta's Collection</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Início
            </Link>
            <Link href="/eletronicos" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Eletrônicos
            </Link>
            <Link
              href="/roupas-femininas"
              className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
            >
              Roupas Femininas
            </Link>
            <Link href="/contato" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Contato
            </Link>
            <Link href="/rastreamento" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
              Rastreamento
            </Link>
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/carrinho" className="relative p-2 text-gray-700 hover:text-yellow-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button className="md:hidden p-2 text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Início
              </Link>
              <Link href="/eletronicos" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Eletrônicos
              </Link>
              <Link
                href="/roupas-femininas"
                className="text-gray-700 hover:text-yellow-600 transition-colors font-medium"
              >
                Roupas Femininas
              </Link>
              <Link href="/contato" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Contato
              </Link>
              <Link href="/rastreamento" className="text-gray-700 hover:text-yellow-600 transition-colors font-medium">
                Rastreamento
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
