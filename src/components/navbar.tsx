"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingCart, Sun, Moon, X } from "lucide-react"
import { useCart } from "./cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { useRouter } from "next/navigation"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isSheetOpen, setSheetOpen] = useState(false)
  const [isDrawerOpen, setDrawerOpen] = useState(false)
  const { cartItems, total, clearCart } = useCart(); // Import clearCart
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleCheckout = () => {
    setDrawerOpen(false)
    setSheetOpen(false) // Close the cart sheet
    setTimeout(() => router.push("/checkout"), 300) // Slight delay for smooth closing effect
  }

  const CartContent = () => (
    <div className="p-6 flex flex-col h-full">
      {/* <h2 className="text-xl font-bold mb-4">Your Cart</h2> */}

      {cartItems.length === 0 ? (
        <p className="text-muted-foreground text-center mt-4">
          Your cart is empty.
        </p>
      ) : (
        <ul className="space-y-4 flex-1 overflow-auto">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-secondary p-3 rounded-lg shadow-sm"
            >
              <div className="flex flex-col">
                <span className="font-medium">{item.name} x {item.quantity}</span>
                <span className="text-sm text-muted-foreground">
                  @Ksh {item.price} each
                </span>
              </div>
              <span className="text-primary font-semibold text-lg">
                Ksh {(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Total Amount */}
      {cartItems.length > 0 && (
        <div className="mt-6 border-t pt-4 flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>Ksh {total.toFixed(2)}</span>
        </div>
      )}

      {/* Clear Cart Button */}
      {cartItems.length > 0 && (
        <Button
          onClick={clearCart}
          className="w-full mt-4 p-4 rounded-[20px] text-lg font-semibold bg-red-500 hover:bg-red-600 text-white"
          variant="destructive"
        >
          Clear Cart
        </Button>
      )}

      {/* Checkout Button */}
      <Button
        onClick={handleCheckout}
        className="w-full my-6 p-4 rounded-[20px] text-lg font-semibold"
        variant="default"
      >
        Proceed to Checkout
      </Button>
    </div>
  )


  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-[900] text-[26px] font-rubik-doodle-shadow">
              mdeluxe
            </Link>
          </div>
          {/* Desktop Navbar */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
            {/* Cart Sheet for Larger Screens */}
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <CartContent />
              </SheetContent>
            </Sheet>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
          {/* Mobile Navbar */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
            {/* Cart Drawer for Small Screens */}
            <Drawer open={isDrawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {totalItems > 0 && (
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-6 flex flex-col bg-background">
                {/* Drawer Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-xl font-bold">Your Cart</h2>
                  <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <CartContent />
              </DrawerContent>
            </Drawer>
            {/* Mobile Navigation Menu */}
            <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex justify-between items-center px-4 py-2 border-b">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button variant="ghost" size="icon" onClick={() => setIsNavOpen(false)}>
                    <X className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex flex-col space-y-4 mt-4 px-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

