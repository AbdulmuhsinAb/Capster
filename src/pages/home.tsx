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
import { ChangeEvent, useContext, useState } from "react"
import ProductService from "../api/products"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import { NavBar } from "@/components/navbar"
import { Link } from "react-router-dom"
import { SearchByProduct } from "@/components/Product/SearchByProduct.1"

export function Home() {
  const context = useContext(Context)
  if (!context) throw Error
  const { state, handleAddToCart } = context
  const { data: products, error: productError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })

  return (
    <>
      <NavBar />
      <section className="flex flex-col md:flex-row gap-4 justify-start max-w-6xl mx-auto flex-wrap">
        {products?.map((aProduct) => (
          <Card key={aProduct.id} className="w-[350px] flex flex-col justify-evenly">
            <CardHeader>
              <img className="mb-4 h-60 object-contain" src={aProduct.img} alt={aProduct.name} />
              <CardTitle>{aProduct.name}</CardTitle>
              <CardDescription>{aProduct.description}</CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full" onClick={() => handleAddToCart(aProduct)}>
                Add to cart
              </Button>
              <Button className="w-full">
                <Link to={"/products/" + aProduct.id}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
      {productError && <p className="text-red-500">{productError.message}</p>}
    </>
  )
}
