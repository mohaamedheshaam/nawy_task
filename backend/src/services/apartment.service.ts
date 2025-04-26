import { z } from "zod"
import { ApartmentRepository, CreateApartmentDTO } from "../repositories/apartment.repository"
import type { Apartment } from "@prisma/client"

const createApartmentSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  location: z.string(),
  bedrooms: z.number(),
  bathrooms: z.number(),
  sqft: z.number(),
  imageUrl: z.string().optional(),
  propertyType: z.enum(["HOUSE", "APARTMENT", "CONDO", "TOWNHOUSE"]),
})

export class ApartmentService {
  private repository: ApartmentRepository

  constructor() {
    this.repository = new ApartmentRepository()
  }

  public async listApartments(filters?: {
    title?: string
    location?: string
    propertyType?: string
    maxPrice?: number
  }): Promise<Apartment[]> {
    return this.repository.findAll(filters)
  }

  public async getApartmentById(id: string): Promise<Apartment | null> {
    return this.repository.findById(id)
  }

  public async createApartment(data: CreateApartmentDTO): Promise<Apartment> {
    const validatedData = createApartmentSchema.parse(data)
    return this.repository.create(validatedData)
  }
}
