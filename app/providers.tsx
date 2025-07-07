"use client"

import type React from "react"

import { CartProvider } from "./context/CartContext"

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>
}
