import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import api from "@/api"
import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { ShoppingCartIcon } from "lucide-react"
import { useContext } from "react"
import { Context } from "@/App"
import { CopyRights } from "@/components/HomePage/CopyRights"

export function ProductDetails() {
  const params = useParams()
  const context = useContext(Context)
  if (!context) throw Error
  const { handleAddToCart } = context
  const getProduct = async () => {
    try {
      const res = await api.get("/products/" + params.productId)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const {
    data: product,
    error: productError,
    isLoading
  } = useQuery<Product>({
    queryKey: ["getProduct"],
    queryFn: getProduct
  })
  if (isLoading) return <p>Loading.....</p>

  if (!product) return <p>Product not found</p>

  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1E5D1] dark:bg-[#1F2937]">
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
              <div>
                <img
                  alt="Product Image"
                  className="aspect-square overflow-hidden rounded-lg object-cover"
                  height="600"
                  src={product.img}
                  width="600"
                />
              </div>
              <div className="grid gap-6 text-left">
                <h1 className="text-3xl font-bold text-[#C39898] dark:text-[#DBB5B5]">
                  {product.name}
                </h1>
                <p className="text-[#987070] dark:text-[#F1E5D1] text-lg">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[#987070] dark:text-[#F1E5D1] text-2xl font-bold">
                    ${product.price}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      className="bg-[#F1E5D1] dark:bg-[#1F2937] text-[#C39898] dark:text-[#DBB5B5] hover:bg-[#C39898] hover:text-gray-50 dark:hover:bg-[#DBB5B5] dark:hover:text-gray-900"
                      variant="outline"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 text-left">
                  <h2 className="text-2xl font-bold text-[#C39898] dark:text-[#DBB5B5]">
                    Product Details
                  </h2>
                  <ul className="grid gap-2 text-[#987070] dark:text-[#F1E5D1]">
                    <li>
                      <span className="font-bold">Material: </span>
                      100% premium cotton
                    </li>
                    <li>
                      <span className="font-bold">Size: </span>
                      One size fits most{"\n                              "}
                    </li>
                    <li>
                      <span className="font-bold">Care: </span>
                      Hand wash cold, lay flat to dry
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <CopyRights />
    </>
  )
}
