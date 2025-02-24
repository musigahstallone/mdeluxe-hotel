import { MenuItems } from "@/components/menu-items"

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Hotel Restaurant Menu</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-3">
          <MenuItems />
        </div>
      </div>
    </div>
  )
}

