import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getPropertyById } from "@/lib/api"
import { BedDouble, Bath, Home, MapPin, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Property not found</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to listings
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          <Image src={property.imageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
          <div className="flex items-center text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{property.location}</span>
          </div>

          <div className="text-2xl font-bold mb-6">{property.price.toLocaleString()}EGP</div>

          <div className="flex flex-wrap gap-4 mb-6">
            <Card className="w-24">
              <CardContent className="p-3 flex flex-col items-center justify-center">
                <BedDouble className="h-5 w-5 mb-1" />
                <span className="text-sm">{property.bedrooms} Beds</span>
              </CardContent>
            </Card>
            <Card className="w-24">
              <CardContent className="p-3 flex flex-col items-center justify-center">
                <Bath className="h-5 w-5 mb-1" />
                <span className="text-sm">{property.bathrooms} Baths</span>
              </CardContent>
            </Card>
            <Card className="w-24">
              <CardContent className="p-3 flex flex-col items-center justify-center">
                <Home className="h-5 w-5 mb-1" />
                <span className="text-sm">{property.sqft} sqft</span>
              </CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-semibold mb-3">Description</h2>
          <p className="text-muted-foreground mb-6">{property.description}</p>

          <div className="flex gap-4">
            <Button  variant="orange" size="lg">Contact Agent</Button>
          </div>
        </div>
      </div>
    </div>
  )
}