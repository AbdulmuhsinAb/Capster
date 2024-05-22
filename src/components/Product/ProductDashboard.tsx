import { Context } from "@/App"
import { useQueryClient } from "@tanstack/react-query"
import { useContext, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table"
import { EditProductBtn } from "./EditProductBtn"
import { DeleteProductBtn } from "./DeleteProductBtn"
import ProductService from "../../api/products"

export function ProductDashboard() {
  const queryClient = useQueryClient()
  const context = useContext(Context)
  if (!context) throw Error
  const { state } = context

  //Product
  const products = state.products.items
  const [item, setItem] = useState({
    categoryId: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    color: ""
  })
  const handleChangeItem = (e) => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: value
    })
  }

  const handleSubmitItem = async (e) => {
    e.preventDefault()
    await ProductService.createOne(item)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-9">
        Products
      </h1>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmitItem}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create a Product</h3>
        <Input
          name="categoryId"
          className="mt-4"
          type="text"
          placeholder="Category ID"
          onChange={handleChangeItem}
        />
        <Input
          name="name"
          className="mt-4"
          type="text"
          placeholder="Product Name"
          onChange={handleChangeItem}
        />
        <Input
          name="description"
          className="mt-4"
          type="text"
          placeholder="Product Description"
          onChange={handleChangeItem}
        />
        <Input
          name="stock"
          className="mt-4"
          type="number"
          placeholder="Number of Stock"
          onChange={handleChangeItem}
        />
        <Input
          name="price"
          className="mt-4"
          type="number"
          placeholder="Price in $"
          onChange={handleChangeItem}
        />
        <Input
          name="color"
          className="mt-4"
          type="text"
          placeholder="Color"
          onChange={handleChangeItem}
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Table of Products
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Category ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((aProduct) => (
            <TableRow key={aProduct.id}>
              <TableCell className="font-medium text-left">{aProduct.name}</TableCell>
              <TableCell className="text-left">{aProduct.id}</TableCell>
              <TableCell className="text-left">{aProduct.categoryId}</TableCell>
              <TableCell className="text-left">{aProduct.price}$</TableCell>
              <TableCell className="text-left">{aProduct.color}</TableCell>
              <TableCell className="text-left">{aProduct.stock}</TableCell>
              <TableCell className="text-left">{aProduct.description}</TableCell>
              <TableCell className="text-left">
                <DeleteProductBtn id={aProduct.id} />
                <EditProductBtn product={aProduct} id={aProduct.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
