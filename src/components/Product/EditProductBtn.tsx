import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/types"
import ProductService from "../../api/products"
import { ChangeEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

type EditProductProps = {
  product: Product
  id: string
}

export function EditProductBtn({ product, id }: EditProductProps) {
  const queryClient = useQueryClient()
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    description: product.description,
    stock: product.stock,
    price: product.price,
    color: product.color,
    img: product.img
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(updatedProduct)
    await ProductService.updateOne(updatedProduct, id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product Details</DialogTitle>
          <DialogDescription>
            Make changes to your user details here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="name"
              defaultValue={product.name}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">description</Label>
            <Input
              name="description"
              defaultValue={product.description}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Stock</Label>
            <Input
              name="stock"
              defaultValue={product.stock}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Price</Label>
            <Input
              name="price"
              defaultValue={product.price}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Color</Label>
            <Input
              name="color"
              defaultValue={product.color}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Image URL</Label>
            <Input
              name="img"
              defaultValue={product.img}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
