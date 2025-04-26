"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search } from "lucide-react"

export default function SearchFilters() {
  const router = useRouter()

  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState("any")
  const [priceRange, setPriceRange] = useState([15000000]) 

  const handleSearch = () => {

    const params = new URLSearchParams()

    if (location.trim()) {
      params.set("location", location.trim())
    }
    if (propertyType !== "any") {
      params.set("propertyType", propertyType)
    }
    if (priceRange[0] > 0) {
      params.set("maxPrice", String(priceRange[0]))
    }

    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="bg-card rounded-lg p-6 shadow-sm border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="text-sm font-medium mb-1 block">Location</label>
          <Input
            placeholder="City, neighborhood, or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Property Type</label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="townhouse">Townhouse</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">Max Price</label>
          <div className="pt-4">
            <Slider
              defaultValue={[500000]}
              max={20000000}
              step={50000}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
          <div className="text-sm text-muted-foreground mt-1">
            Up to {priceRange[0].toLocaleString()}
          </div>
        </div>

        <div className="flex items-end">
          <Button variant="orange" className="w-full" onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search 
          </Button>
        </div>
      </div>
    </div>
  )
}
