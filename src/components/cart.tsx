"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useCart } from "./cart-context"

// Cart component
export function Cart() {
  const { cartItems, total, clearCart } = useCart()
  const isCartEmpty = cartItems.length === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>This is The Cart</CardTitle>
      </CardHeader>
      <CardContent>
        {isCartEmpty ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <span>
                  {item.name} <span className="text-gray-500">x{item.quantity}</span>
                </span>
                <span className="font-semibold">Ksh {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}
        <div className="font-bold mt-4">Total: Ksh {total.toFixed(2)}</div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button asChild className="w-full" disabled={isCartEmpty}>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={clearCart} disabled={isCartEmpty}>
          Clear Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

