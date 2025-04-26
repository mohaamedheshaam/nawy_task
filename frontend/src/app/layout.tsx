import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Home } from "lucide-react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nawy | Find Your Dream Home",
  description: "Browse exclusive property listings and find your perfect home"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <header className="border-b">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-6 w-6" />
                <span className="font-bold text-xl">Nawy</span>
              </Link>
              <nav className="flex gap-6">
                <Link href="/" className="font-medium">
                  Home
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6">
          </footer>
        </div>
      </body>
    </html>
  )
}
