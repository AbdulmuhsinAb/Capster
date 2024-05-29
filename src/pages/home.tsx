import { Context } from "@/App"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useContext } from "react"
import ProductService from "../api/products"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"

import { Link } from "react-router-dom"
import { SearchByProduct } from "@/components/Product/SearchByProduct.1"
import { NavBar } from "@/components/NavBar"
import { Hero } from "@/components/HomePage/Hero"
import { FeaturesProducts } from "@/components/HomePage/FeaturedProducts"
import { CustomerReviews } from "@/components/HomePage/CustomerReviews"
import { NewsLetter } from "@/components/HomePage/NewsLetter"
import { Contacts } from "@/components/HomePage/Contacts"
import { CopyRights } from "@/components/HomePage/CopyRights"

export function Home() {
  const context = useContext(Context)
  if (!context) throw Error
  const { handleAddToCart } = context
  const { data: products, error: productError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <NavBar />
      <main className="flex-1">
        <Hero />
        <FeaturesProducts />
        <CustomerReviews />
        <NewsLetter />
        <Contacts />
      </main>
      <CopyRights />
    </div>
  )
}
