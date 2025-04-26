import { prisma } from "../../server"
import { PropertyType, Apartment } from "@prisma/client"

export interface FindOptions {
  title?: string
  location?: string
  propertyType?: string
  maxPrice?: number
}

export interface CreateApartmentDTO {
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  imageUrl?: string
  propertyType: string  // 'HOUSE' | 'APARTMENT' | 'CONDO' | 'TOWNHOUSE'
}

export class ApartmentRepository {

  public async findAll(options?: FindOptions): Promise<Apartment[]> {
    const whereClause: any = {}

    if (options?.title) {
      whereClause.title = {
        contains: options.title,
        mode: "insensitive",
      }
    }
    if (options?.location) {
      whereClause.location = {
        contains: options.location,
        mode: "insensitive",
      }
    }

    if (options?.propertyType && options.propertyType.toLowerCase() !== "any") {
      whereClause.propertyType = options.propertyType.toUpperCase()
    }

    if (typeof options?.maxPrice === "number") {
      whereClause.price = { lte: options.maxPrice }
    }

    return prisma.apartment.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    })
  }

  public async findById(id: string): Promise<Apartment | null> {
    return prisma.apartment.findUnique({ where: { id } })
  }

  public async create(data: CreateApartmentDTO): Promise<Apartment> {
    const propertyTypeEnum = data.propertyType.toUpperCase() as PropertyType

    return prisma.apartment.create({
      data: {
        ...data,
        propertyType: propertyTypeEnum,
      },
    })
  }

}
