import { ChangeEvent, useContext, useState } from "react"
import api from "@/api"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Product } from "@/types"
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Link } from "react-router-dom"
import { Context } from "@/App"
import { SearchIcon } from "lucide-react"

export function SearchByProduct() {
  const [searchBy, setSearchBy] = useState("")
  const queryClient = useQueryClient()
  const context = useContext(Context)
  if (!context) throw Error
  const { state, handleAddToCart } = context

  const searchProduct = async () => {
    try {
      const res = await api.get("/products/search?keyword=" + searchBy)
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
    queryClient.invalidateQueries({ queryKey: ["searchByProduct"] })
  }
  return (
    <div className="">
      <Popover>
        <PopoverTrigger asChild>
          <SearchIcon></SearchIcon>
        </PopoverTrigger>
        <PopoverContent className="w-80 border-solid border-2 border-inherit mr-9 bg-stone-300">
          <div className=" w-96 p-9/12 bg-red-300">
            <div className="w-full md:w-1/2 mx-auto mb-10">
              <Input type="search" placeholder="Search for a product" onChange={handleChange} />
            </div>
            <div className=" flex flex-col flex-nowrap justify-between items-start gap-4">
              {products?.map((product) => {
                return (
                  <div key={product.id} className="flex m-2 items-center gap-2 ">
                    <img
                      className="mb-4 h-10 object-contain"
                      src={product.img}
                      alt={product.name}
                    />
                    <h4>{product.name}</h4>
                    <span className="font-bold">{product.price}$</span>
                  </div>
                )
              })}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
