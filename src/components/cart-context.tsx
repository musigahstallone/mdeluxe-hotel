"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import type { MenuItem } from "@/lib/menu-data"

// Define CartItem interface extending MenuItem with quantity
interface CartItem extends MenuItem {
  quantity: number
}

// Define CartContextType with cart operations
interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: MenuItem) => void
  clearCart: () => void
  total: number
}

// Create CartContext
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart Provider component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart")
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  // Save cart to localStorage on cart update
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems))
    }
  }, [cartItems])

  // Add item to cart or update quantity
  const addToCart = (item: MenuItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      return existingItem
          ? prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
          : [...prevItems, { ...item, quantity: 1 }]
    })
  }

  // Clear cart and remove from localStorage
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cart")
  }

  // Calculate total cost
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
      <CartContext.Provider value={{ cartItems, addToCart, clearCart, total }}>
        {children}
      </CartContext.Provider>
  )
}

// Custom hook to use CartContext
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

