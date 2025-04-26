import express from "express"
import cors from "cors"
import morgan from "morgan"
import { apartmentsRouter } from "./src/routes/apartments.routes"
import { PORT } from "./env"
import { prisma } from "./server"

const app = express()

app.use(morgan("dev"))

app.use(cors())
app.use(express.json())

app.get("/api/health", (_, res) => {
  res.json({ status: "ok" })
})

app.use("/api/apartments", apartmentsRouter)

app.use((err: any, req: express.Request, res: express.Response) => {
  console.error("Unhandled error:", err)
  res.status(500).json({ error: "Internal server error" })
})

async function startServer() {
  try {
    await prisma.$connect()
    console.log("Database connected successfully")

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
    process.exit(1)
  }
}

startServer()
