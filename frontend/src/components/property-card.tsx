import { Card, CardContent } from "@/components/ui/card"
import type { Property } from "@/lib/types"
import { BedDouble, Bath, Home, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/properties/${property.id}`}>
      <Card className="overflow-hidden h-full transition-all hover:shadow-md">
        <div className="relative h-48 w-full">
          <Image src={property.imageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
          <div className="flex items-center text-muted-foreground text-sm mb-2">
            <MapPin className="h-3 w-3 mr-1" />
            <span className="line-clamp-1">{property.location}</span>
          </div>
          <div className="text-lg font-bold mb-2">{property.price.toLocaleString()}EGP</div>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-1" />
              <span>{property.bedrooms} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{property.bathrooms} Baths</span>
            </div>
            <div className="flex items-center">
              <Home className="h-4 w-4 mr-1" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
