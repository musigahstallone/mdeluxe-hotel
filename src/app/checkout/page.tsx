"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Confetti from "react-confetti"
import { useCart } from "@/components/cart-context"

export default function Checkout() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const { total, clearCart, cartItems } = useCart()
  const [phoneNumber, setPhoneNumber] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (cartItems.length === 0) {
      router.push("/cart")
    }
  }, [cartItems, router])

  const handlePayment = () => {
    if (phoneNumber.trim() === "") return
    setIsPaymentProcessing(true)
    setTimeout(() => {
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setIsPaymentProcessing(false)
        clearCart()
        router.push("/")
      }, 10000) // Show confetti for 10 seconds, then redirect
    }, 10000) // Simulate payment processing for 10 seconds
  }

  const isPhoneNumberValid = phoneNumber.trim() !== ""

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <Card>
        <CardHeader>
          <CardTitle>M-Pesa Payment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="+254XXXXXXXXX"
              value={phoneNumber}
              disabled={isPaymentProcessing || cartItems.length === 0}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="text-lg font-bold">Total to pay: Ksh {total.toFixed(2)}</div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handlePayment}
            disabled={!isPhoneNumberValid || isPaymentProcessing || cartItems.length === 0}
          >
            {isPaymentProcessing ? "Processing..." : "Pay Now"}
          </Button>
        </CardFooter>
      </Card>
      {showConfetti && <Confetti />}
    </div>
  )
}

