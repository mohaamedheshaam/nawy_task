import { Router } from "express"
import { ApartmentController } from "../controllers/apartment.controller"

export const apartmentsRouter = Router()

apartmentsRouter.get("/", (req, res, next) => {
  ApartmentController.getAll(req, res).catch(next)
})

apartmentsRouter.get("/:id", (req, res, next) => {
  ApartmentController.getById(req, res).catch(next)
})

apartmentsRouter.post("/", (req, res, next) => {
  ApartmentController.create(req, res).catch(next)
})
