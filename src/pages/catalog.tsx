import { NavBar } from "@/components/NavBar"
import { ChangeEvent, FormEvent, useContext, useState } from "react"
import { Context } from "@/App"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from "@/types"
import api from "@/api"
import { Input } from "@/components/ui/input"
import { CopyRights } from "@/components/HomePage/CopyRights"

export function Catalog() {
  const [searchBy, setSearchBy] = useState("")
  const queryClient = useQueryClient()
  const context = useContext(Context)
  if (!context) throw Error
  const { handleAddToCart } = context

  const searchProduct = async () => {
    try {
      console.log("sss::  ", searchBy)

      const res = await api.get("/products?searchBy=" + searchBy)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: products, error: productError } = useQuery<Product[]>({
    queryKey: ["searchByProduct"],
    queryFn: searchProduct
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchBy(value)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    queryClient.invalidateQueries({ queryKey: ["searchByProduct"] })
  }

  return (
    <div>
      <NavBar />
      <form className="flex gap-2 w-full md:w-1/2 mx-auto mb-10" onSubmit={handleSubmit}>
        <Input type="search" placeholder="Search for a product" onChange={handleChange} />
        <Button
          type="submit"
          className="inline-flex h-10 w-28 items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
        >
          Search
        </Button>
      </form>
      <section className="flex flex-col md:flex-row gap-4 justify-center max-w-6xl mx-auto flex-wrap">
        {products?.map((aProduct) => (
          <Card key={aProduct.id}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <img
                alt={aProduct.name}
                className="aspect-square overflow-hidden rounded-lg object-cover b"
                height="200"
                src={aProduct.img}
                width="200"
              />
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-[#987070] dark:text-[#DBB5B5]">
                  {aProduct.name}
                </h3>
                <p className="text-[#987070] dark:text-[#F1E5D1]">${aProduct.price}</p>
              </div>
              <div className="flex w-full gap-2">
                <Button
                  className="inline-flex h-9 w-28 items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
                  onClick={() => handleAddToCart(aProduct)}
                >
                  Add to cart
                </Button>
                <Link
                  className="inline-flex h-9 w-28 items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
                  to={"/products/" + aProduct.id}
                >
                  Details
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
      <CopyRights />
      {productError && <p className="text-red-500">{productError.message}</p>}
    </div>
  )
}
