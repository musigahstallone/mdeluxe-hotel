"use client"

// import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, ShoppingCart, Sun, Moon } from "lucide-react"
import { useCart } from "./cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useTheme } from "next-themes"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  // const [isOpen, setIsOpen] = useState(false)
  const { cartItems } = useCart()
  const { theme, setTheme } = useTheme()

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-[900] text-[26px] font-rubik-doodle-shadow">
              mdeluxe
            </Link>
          </div>
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
            <Link href="/cart" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">
              <ShoppingCart className="h-6 w-6 inline-block mr-1" />
              <span className="align-middle">{totalItems}</span>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
          </div>
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </Button>
            <Link href="/cart" className="text-foreground hover:text-primary px-3 py-2 rounded-md">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute top-3 right-14 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {totalItems}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-foreground hover:text-primary px-3 py-2 rounded-md text-base font-medium"
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

