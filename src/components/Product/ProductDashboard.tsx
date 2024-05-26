import { useQuery, useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table"
import { EditProductBtn } from "./EditProductBtn"
import { DeleteProductBtn } from "./DeleteProductBtn"
import ProductService from "../../api/products"
import CategoryService from "../../api/categories"
import { Category, Product } from "@/types"
import { log } from "console"

export function ProductDashboard() {
  const queryClient = useQueryClient()
  const { data: products, error: productError } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductService.getAll
  })
  const { data: categories, error: categoryError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: CategoryService.getAll
  })
  const [item, setItem] = useState({
    categoryId: "",
    name: "",
    description: "",
    stock: 0,
    price: 0,
    color: "",
    img: ""
  })

  const productsWithCat = products?.map((p) => {
    const category = categories?.find((cat) => cat.id === p.categoryId)
    if (category)
      return {
        ...p,
        categoryId: category.categoryName
      }
    return p
  })

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setItem({
      ...item,
      categoryId: e.target.value
    })
  }

  const handleChangeItem = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setItem({
      ...item,
      [name]: value
    })
  }

  const handleSubmitItem = async (e: FormEvent) => {
    e.preventDefault()
    if (item.categoryId == "") item.categoryId = "9e582037-df88-453b-9dc3-c970f36659de"
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
          name="name"
          className="mt-4"
          type="text"
          placeholder="Product Name"
          onChange={handleChangeItem}
        />
        <select
          name="Categories"
          onChange={handleSelect}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-4"
        >
          {categories?.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.categoryName}
              </option>
            )
          })}
        </select>
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
        <Input
          name="img"
          className="mt-4"
          type="text"
          placeholder="Image URL"
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
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Description</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsWithCat?.map((aProduct) => (
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
