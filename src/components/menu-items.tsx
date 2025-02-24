"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomizeModal } from "@/components/customize-modal"
import { Input } from "@/components/ui/input"
import { menuItems, type MenuItem } from "@/lib/menu-data"

export function MenuItems() {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const filteredItems = menuItems.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const displayedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="space-y-4">
      <Input
        type="text"
        placeholder={`Search ${menuItems.length} menu items...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {displayedItems.map((item, index) => (
          <Card key={item.id} className={`${index % 2 === 0 ? "bg-muted" : "bg-card"}`}>
            <CardHeader className="p-4">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="text-sm">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-center">
                <p className="text-[16px] font-semibold">Ksh {item.price.toFixed(2)}</p>
                <Button size="sm" onClick={() => setSelectedItem(item)}>
                  Add
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <span className="py-2">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {selectedItem && <CustomizeModal item={selectedItem} onCloseAction={() => setSelectedItem(null)} />}
    </div>
  )
}

