import { Request, Response } from "express"
import { ZodError } from "zod"
import { ApartmentService } from "../services/apartment.service"

const apartmentService = new ApartmentService()

export class ApartmentController {
  // GET /api/apartments
  public static async getAll(req: Request, res: Response) {
    try {
      const { title, location, propertyType, maxPrice } = req.query
      const apartments = await apartmentService.listApartments({
        title: title as string,
        location: location as string,
        propertyType: propertyType as string,
        maxPrice: maxPrice ? Number(maxPrice) : undefined
      })
      res.status(200).json(apartments)
    } catch (error) {
      console.error("Error fetching apartments:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  // GET /api/apartments/:id
  public static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params
      const apartment = await apartmentService.getApartmentById(id)
      if (!apartment) {
        return res.status(404).json({ error: "Apartment not found" })
      }
      res.status(200).json(apartment)
    } catch (error) {
      console.error("Error fetching apartment by id:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }

  // POST /api/apartments
  public static async create(req: Request, res: Response) {
    try {
      const newApartment = await apartmentService.createApartment(req.body)
      res.status(201).json(newApartment)
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors })
      }
      console.error("Error creating apartment:", error)
      res.status(500).json({ error: "Internal server error" })
    }
  }
}
