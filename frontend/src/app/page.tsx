"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import PropertyList from "@/components/property-list"
import SearchFilters from "@/components/search-filters"

export default function Home() {
  const [properties, setProperties] = useState([])

  const searchParams = useSearchParams()

  const BASE_URL = "http://localhost:8080/api"
  useEffect(() => {
    const url = new URL(`${BASE_URL}/apartments`)

    const location = searchParams.get("location")
    const propertyType = searchParams.get("propertyType")
    const maxPrice = searchParams.get("maxPrice")

    if (location) {
      url.searchParams.set("location", location)
    }
    if (propertyType) {
      url.searchParams.set("propertyType", propertyType)
    }
    if (maxPrice) {
      url.searchParams.set("maxPrice", maxPrice)
    }

    const fetchData = async () => {
      try {
        const res = await fetch(url.toString())
        if (!res.ok) {
          throw new Error("Failed to fetch apartments.")
        }
        const data = await res.json()
        setProperties(data)
      } catch (err) {
        console.error("Error fetching apartments:", err)
      }
    }
    fetchData()
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Find Your Dream Home</h1>
      <p className="text-muted-foreground mb-8">
        Browse our exclusive property listings
      </p>

      <SearchFilters />

      <div className="mt-8">
        <PropertyList properties={properties} />
      </div>
    </div>
  )
}
