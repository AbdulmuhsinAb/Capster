import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { useContext } from "react"
import { Context } from "@/App"
import { MinusIcon, PlusIcon, ShoppingCart } from "lucide-react"
import { Product } from "@/types"
import api from "@/api"
type OrderItem = {
  quantity: number
  productId: string
}

type OrderCheckout = {
  addressId: string
  items: OrderItem[]
}
export function Cart() {
  const context = useContext(Context)
  if (!context) throw Error
  const { state, handleDeleteFromCart, handleAddToCart, handleEmptyCart } = context

  const groups = state.cart.reduce((acc, obj) => {
    const key = obj.id
    const curGroup = acc[key] ?? []
    return { ...acc, [key]: [...curGroup, obj] }
  }, {} as { [productId: string]: Product[] })

  let total = 0
  state.cart.forEach((item) => (total += item.price))

  const checkoutOrder: OrderCheckout = {
    addressId: "06d88986-7b2d-4fe6-892a-71a803d7b33a",
    items: []
  }

  Object.keys(groups).forEach((key) => {
    const products = groups[key]
    checkoutOrder.items.push({
      quantity: products.length,
      productId: key
    })
  })

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/orders/checkout", checkoutOrder, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (res.status === 201) handleEmptyCart()
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer w-6 h-5 text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]" />
          <span className="w-6 h-5 text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]">
            ({Object.keys(groups).length})
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className=" flex flex-col w-96 mr-9 bg-[#F1E5D1] justify-between">
        <div className=" flex flex-col flex-nowrap justify-between items-start gap-4">
          {state.cart.length == 0 && (
            <p className=" w-full h-5 mt-4 text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]">
              Cart is Empty
            </p>
          )}
          {Object.keys(groups).map((key) => {
            const products = groups[key]
            const product = products[0]
            return (
              <div
                key={product.id}
                className="flex w-full justify-around border-t-2 border-[#987070]"
              >
                <div className="flex flex-col w-1/3  justify-center mt-2">
                  <img className="h-10 object-contain" src={product.img} alt={product.name} />
                  <h4 className="">{product.name}</h4>
                </div>
                <div className="w-1/3 flex flex-col justify-center mt-2">
                  <h5 className="font-bold">${product.price}</h5>
                </div>
                <div className="w-1/3 mt-4">
                  <Button
                    className="bg-[#F1E5D1] dark:bg-[#1F2937] text-[#C39898] dark:text-[#DBB5B5] hover:bg-[#C39898] hover:text-gray-50 dark:hover:bg-[#DBB5B5] dark:hover:text-gray-900"
                    variant="outline"
                    onClick={() => handleDeleteFromCart(product.id)}
                  >
                    <MinusIcon className="h-4 w-4" />
                  </Button>
                  <span className=" text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]">
                    {products.length}
                  </span>
                  <Button
                    className="bg-[#F1E5D1] dark:bg-[#1F2937] text-[#C39898] dark:text-[#DBB5B5] hover:bg-[#C39898] hover:text-gray-50 dark:hover:bg-[#DBB5B5] dark:hover:text-gray-900"
                    variant="outline"
                    onClick={() => handleAddToCart(product)}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex flex-col w-full gap-4">
          <h5 className=" w-full h-5 text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]">
            Total: ${total}
          </h5>
          <Button
            className="inline-flex h-9 items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
