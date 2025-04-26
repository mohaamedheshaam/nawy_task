const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed database...')

  await prisma.apartment.deleteMany({})

  const apartments = [
    {
      title: "Modern Nile View Apartment",
      description: "Spacious apartment with Nile River views, modern finishes, and a large balcony.",
      price: 3500000, 
      location: "Zamalek, Cairo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 2000,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "APARTMENT",
    },
    {
      title: "Luxury Condo in New Cairo",
      description: "Elegant condo with premium amenities, open-plan kitchen, and gated community access.",
      price: 2800000, 
      location: "Fifth Settlement, Cairo",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1500,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "CONDO",
    },
    {
      title: "Cozy Maadi Apartment",
      description: "Charming apartment with modern updates, near cafes and international schools.",
      price: 2000000, 
      location: "Maadi, Cairo",
      bedrooms: 2,
      bathrooms: 1,
      sqft: 1200,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "APARTMENT",
    },
    {
      title: "Penthouse in Sheikh Zayed",
      description: "Stylish penthouse with rooftop terrace and city views, in a vibrant community.",
      price: 4500000, 
      location: "Sheikh Zayed City, Cairo",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2500,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "APARTMENT",
    },
    {
      title: "Contemporary Townhouse",
      description: "Modern townhouse with open layout, private garden, and community facilities.",
      price: 3200000, 
      location: "6th of October City, Cairo",
      bedrooms: 3,
      bathrooms: 2.5,
      sqft: 1800,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "TOWNHOUSE",
    },
    {
      title: "Nile-Front Villa",
      description: "Luxurious villa with Nile views, private pool, and spacious outdoor area.",
      price: 8000000, 
      location: "Giza, Cairo",
      bedrooms: 5,
      bathrooms: 4,
      sqft: 4000,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "HOUSE",
    },
    {
      title: "Smart Home in Madinaty",
      description: "High-tech apartment with smart home features, in a serene gated community.",
      price: 2600000, 
      location: "Madinaty, Cairo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1600,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "APARTMENT",
    },
    {
      title: "Classic Heliopolis Apartment",
      description: "Elegant apartment with high ceilings, near historic sites and modern amenities.",
      price: 3000000, 
      location: "Heliopolis, Cairo",
      bedrooms: 3,
      bathrooms: 2,
      sqft: 1800,
      imageUrl: "/placeholder.jpg?height=400&width=600",
      propertyType: "APARTMENT",
    },
  ]

  for (const apartment of apartments) {
    await prisma.apartment.create({
      data: apartment,
    })
  }

  console.log('Database seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })