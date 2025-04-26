export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  imageUrl: string
  propertyType: "house" | "apartment" | "condo" | "townhouse"
}
