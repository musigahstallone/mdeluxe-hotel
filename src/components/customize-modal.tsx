"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import type { MenuItem } from "@/lib/menu-data"
import { useCart } from "./cart-context"
import { useMediaQuery } from "@/lib/use-media-query"

const toppings = [
  { id: 1, name: "Kachumbari", price: 20 },
  { id: 2, name: "Fried Onions", price: 10 },
  { id: 3, name: "Nyama Choma Sauce", price: 30 },
  { id: 4, name: "Roasted Peanuts", price: 20 },
  { id: 5, name: "Chili Sauce", price: 10 },
  { id: 6, name: "Avocado Slices", price: 30 },
  { id: 7, name: "Coconut Flakes", price: 20 },
];

interface CustomizeModalProps {
  item: MenuItem
  onCloseAction: () => void
}

export function CustomizeModal({ item, onCloseAction }: CustomizeModalProps) {
  const [selectedToppings, setSelectedToppings] = useState<number[]>([])
  const { addToCart } = useCart()
  const isDesktop = useMediaQuery("(min-width: 580px)")

  const handleToppingChange = (toppingId: number) => {
    setSelectedToppings((prev) =>
      prev.includes(toppingId) ? prev.filter((id) => id !== toppingId) : [...prev, toppingId]
    )
  }

  const totalPrice =
    item.price +
    selectedToppings.reduce((sum, toppingId) => {
      const topping = toppings.find((t) => t.id === toppingId)
      return sum + (topping ? topping.price : 0)
    }, 0)

  const handleAddToCart = () => {
    const cartItem = {
      ...item,
      price: totalPrice,
      toppings: selectedToppings,
    }
    addToCart(cartItem)
    onCloseAction()
  }

  return isDesktop ? (
    <Sheet open={true} onOpenChange={onCloseAction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize {item.name}</SheetTitle>
          <SheetDescription>Add extra toppings for more flavor.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {toppings.map((topping) => (
            <div key={topping.id} className="flex items-center space-x-2">
              <Checkbox
                id={`topping-${topping.id}`}
                checked={selectedToppings.includes(topping.id)}
                onCheckedChange={() => handleToppingChange(topping.id)}
              />
              <Label htmlFor={`topping-${topping.id}`}>
                {topping.name} (+Ksh {topping.price})
              </Label>
            </div>
          ))}
        </div>
        <SheetFooter>
          <p className="text-lg font-bold">Total: Ksh {totalPrice}</p>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ) : (
    <Drawer open={true} onOpenChange={onCloseAction}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Customize {item.name}</DrawerTitle>
          <DrawerDescription>Add extra toppings for more flavor.</DrawerDescription>
        </DrawerHeader>
        <div className="grid gap-4 py-4">
          {toppings.map((topping) => (
            <div key={topping.id} className="flex items-center space-x-2 mx-5">
              <Checkbox
                id={`topping-${topping.id}`}
                checked={selectedToppings.includes(topping.id)}
                onCheckedChange={() => handleToppingChange(topping.id)}
              />
              <Label htmlFor={`topping-${topping.id}`}>
                {topping.name} (+Ksh {topping.price})
              </Label>
            </div>
          ))}
        </div>
        <DrawerFooter>
          <p className="text-lg font-bold">Total: Ksh {totalPrice}</p>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
