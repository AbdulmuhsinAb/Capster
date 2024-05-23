import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Button } from "./ui/button"
import { useContext } from "react"
import { Context } from "@/App"
import { Delete, ShoppingCart } from "lucide-react"

export function Cart() {
  const context = useContext(Context)
  if (!context) throw Error
  const { state, handleDeleteFromCart } = context
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex gap-1">
          <ShoppingCart className="cursor-pointer" />
          <span>({state.cart.length})</span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-solid border-2 border-inherit mr-9 bg-stone-300">
        <div className=" flex flex-col flex-nowrap justify-between items-start gap-4">
          {state.cart.length == 0 && <p className="m-3">NO ITEMS</p>}
          {state.cart.map((product) => {
            return (
              <div key={product.id} className="flex m-2 items-center gap-2 ">
                <img className="mb-4 h-10 object-contain" src={product.img} alt={product.name} />
                <h4>{product.name}</h4>
                <span className="font-bold">{product.price}$</span>
                <Button
                  variant="destructive"
                  className="p-2"
                  onClick={() => handleDeleteFromCart(product.id)}
                >
                  X
                </Button>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
