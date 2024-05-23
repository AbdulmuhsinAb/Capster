import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { Product } from "@/types"
import api from "@/api"
import { NavBar } from "@/components/navbar"

export function ProductDetails() {
  const params = useParams()

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
      <h1>{product?.name}</h1>
    </>
  )
}
