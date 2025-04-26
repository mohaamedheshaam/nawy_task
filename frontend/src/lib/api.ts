const BASE_URL = process.env.NEXT_PUBLIC_API_URL|| "http://localhost:8080/api"

export async function getProperties() {
  console.log(BASE_URL)  
  const res = await fetch(`${BASE_URL}/apartments`)
  if (!res.ok) {
    throw new Error("Failed to fetch properties from backend")
  }
  return await res.json()
}


export async function getPropertyById(id: string) {
  console.log(`${BASE_URL}/apartments/${id}`)
  const res = await fetch(`${BASE_URL}/apartments/${id}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch property with id ${id}`)
  }
  return await res.json()
}

export async function createApartment(data: {
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  imageUrl?: string
  propertyType: string
}) {
  const res = await fetch(`${BASE_URL}/apartments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error("Failed to create apartment listing")
  }
  return await res.json()
}
