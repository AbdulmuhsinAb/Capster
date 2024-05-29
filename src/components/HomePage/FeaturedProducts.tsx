import { Context } from "@/App"
import { Product } from "@/types"
import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Card, CardContent } from "../ui/card"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import api from "@/api"

export function FeaturesProducts() {
  const context = useContext(Context)
  if (!context) throw Error
  const { handleAddToCart } = context

  const searchProduct = async () => {
    try {
      const res = await api.get(`/products?limit=3&offset=3`)
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
  return (
    <div>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1E5D1] dark:bg-[#1F2937]">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#987070] dark:text-[#DBB5B5]">
              Featured Products
            </h2>
            <p className="mx-auto max-w-[700px] text-[#987070] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#F1E5D1]">
              Discover our latest collection of stylish caps and beanies.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
          </div>
        </div>
      </section>
      {productError && <p className="text-red-500">{productError.message}</p>}
    </div>
  )
}
