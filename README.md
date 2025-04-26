# Nawy Task - Real Estate Listing Application 

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
 - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Development Mode](#development-mode)
  - [Docker Deployment](#docker-deployment)
- [API Documentation](#api-documentation)
  - [Apartments Endpoints](#apartments-endpoints)
  - [Database Schema](#database-schema)

---

## Overview

**Nawy Task** is built with  **Next.js** frontend and an **Express** backend. with **TypeScript**, **Prisma** ORM, and a **PostgreSQL** 



## Tech Stack

### Frontend
- **Next.js 15**: React framework with server-side rendering.
- **React 19**: Component-based UI library.
- **TypeScript**: Static typing for robust development.
- **Tailwind CSS**: Utility-first CSS framework.
- **Radix UI**: Headless UI components.
- **Lucide React**: Icon library.
- **React Hook Form** + **Zod**: Form handling & data validation.

### Backend
- **Express**: Node.js framework for building RESTful APIs.
- **TypeScript**: Type-safe backend services.
- **Prisma**: ORM for database access.
- **PostgreSQL**: Relational database running in Docker.
- **Zod**: API input validation.


## Project Structure

```
nawy_task/
├── backend/                  # Express backend
│   ├── prisma/               # Prisma schema and migrations
│   │   ├── schema.prisma     # Database schema
│   │   └── seed.js           # Seed data for development
│   ├── src/
│   │   ├── controllers/      # Request handlers (Controllers)
│   │   ├── repositories/     # Database access layer (Repositories)
│   │   ├── routes/           # API route definitions
│   │   └── services/         # Business logic (Services)
│   ├── .env                  # Backend environment variables
│   ├── Dockerfile            # Backend container definition
│   ├── index.ts              # Backend entry point
│   └── tsconfig.json         # TypeScript configuration
├── frontend/                 # Next.js frontend
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── app/              # Next.js App Router
│   │   │   ├── properties/   # Property pages
│   │   │   ├── globals.css   # Global styles
│   │   │   ├── layout.tsx    # Root layout
│   │   │   └── page.tsx      # Home page
│   │   ├── components/       # React components
│   │   ├── hooks/            # Custom React hooks
│   │   └── lib/              # Utility functions and types
│   ├── .env.local            # Frontend environment variables
│   ├── Dockerfile            # Frontend container definition
│   └── tsconfig.json         # TypeScript configuration
├── docker-compose.yml        # Docker Compose configuration
└── README.md                 # Documentation
```

---


### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohaamedheshaam/nawy_task.git
   cd nawy_task
   ```

2. **Install dependencies** for both backend and frontend:

   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

### Environment Variables

#### Backend (.env)

Create a `.env` file in the `backend` folder:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/nawy_db
PORT=8080
```

- `DATABASE_URL`: Connection string to PostgreSQL. Switch `db` → `localhost` if not using Docker.
- `PORT`: Port for the Express server (default `8080`).

#### Frontend (.env.local)

Create a `.env.local` file in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

- `NEXT_PUBLIC_API_URL`: The base URL for the backend API.  
  - Use `http://backend:8080/api` if running **both** frontend & backend in Docker.  
  - Use `http://localhost:8080/api` if running locally outside Docker.

---

## Running the Application

### Development Mode

**Backend:**

```bash
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
node prisma/seed.js

# Start dev server
npm run dev
```
Backend is at [http://localhost:8080](http://localhost:8080).

**Frontend:**

```bash
cd frontend
npm run dev
```
Frontend is at [http://localhost:3000](http://localhost:3000).

---

### Docker Deployment

To run **all** services (database, backend, frontend) in Docker:

```bash
# From the project's root directory
docker-compose up --build
```

Docker Compose will:
1. Start PostgreSQL container (port 5433 → 5432 inside container).  
2. Build & start the backend (port 8080).  
3. Build & start the frontend (port 3000).

After startup:
- **Frontend** → [http://localhost:3000](http://localhost:3000)  
- **Backend** API → [http://localhost:8080/api](http://localhost:8080/api)  
- **Postgres** → accessible at `localhost:5433` (optional external usage)

---

## API Documentation

### Apartments Endpoints

#### **GET** `/api/apartments`

Retrieve all apartments with optional filters:

- **Query Params**  
  - `title` (string, optional)  
  - `location` (string, optional)  
  - `propertyType` (string, optional)  
  - `maxPrice` (number, optional)  

**Response**:
```json
[
  {
    "id": "a3432f58-cc6d-4b71-9b21-...",
    "title": "Modern Nile View Apartment",
    "description": "...",
    "price": 3500000,
    "location": "Zamalek, Cairo",
    "bedrooms": 3,
    "bathrooms": 2,
    "sqft": 2000,
    "imageUrl": "/placeholder.svg",
    "propertyType": "APARTMENT",
    "createdAt": "...",
    "updatedAt": "..."
  },
  ...
]
```

#### **GET** `/api/apartments/:id`

Retrieve a single apartment by ID.

**Response**:
```json
{
  "id": "...",
  "title": "Modern Nile View Apartment",
  "description": "...",
  "price": 3500000,
  "location": "Zamalek, Cairo",
  "bedrooms": 3,
  "bathrooms": 2,
  "sqft": 2000,
  "imageUrl": "/placeholder.svg",
  "propertyType": "APARTMENT",
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### **POST** `/api/apartments`

Create a new apartment.

**Request Body**:
```json
{
  "title": "Contemporary Home",
  "description": "Brand new ...",
  "price": 5000000,
  "location": "Heliopolis, Cairo",
  "bedrooms": 3,
  "bathrooms": 2.5,
  "sqft": 1800,
  "imageUrl": "https://example.com/home.jpg",
  "propertyType": "HOUSE"
}
```

**Response**: Returns created apartment (201 Created).

---

### Database Schema

The **Prisma** schema (`backend/prisma/schema.prisma`):

```prisma
model Apartment {
  id           String       @id @default(uuid())
  title        String
  description  String
  price        Int
  location     String
  bedrooms     Int
  bathrooms    Float
  sqft         Int
  imageUrl     String?
  propertyType PropertyType
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

enum PropertyType {
  HOUSE
  APARTMENT
  CONDO
  TOWNHOUSE
}
```

---

