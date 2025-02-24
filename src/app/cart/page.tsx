"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
  const { cartItems, total, clearCart } = useCart()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <Card>
        <CardHeader>
          <CardTitle>Cart Items</CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>Ksh {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))
          )}
          <div className="font-bold mt-4">Total: Ksh {total.toFixed(2)}</div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full" disabled={cartItems.length === 0}>
            <Link href="/checkout">Proceed to Checkout</Link>
          </Button>
          <Button variant="outline" className="w-full" onClick={clearCart} disabled={cartItems.length === 0}>
            Clear Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

