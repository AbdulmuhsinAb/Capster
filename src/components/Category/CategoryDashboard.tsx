import api from "@/api"
import { Category } from "@/types"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table"
import { DeleteCategoryBtn } from "./DeleteCategoryBtn"
import { EditCategoryBtn } from "./EditCategoryBtn"

export function CategoryDashboard() {
  const queryClient = useQueryClient()
  // category
  const [category, setCategory] = useState({
    categoryName: ""
  })
  const handleChangeCategory = (e) => {
    const { name, value } = e.target
    setCategory({
      ...category,
      [name]: value
    })
  }
  const postCategory = async () => {
    try {
      const res = await api.post("/categorys", category)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmitCategory = async (e) => {
    e.preventDefault()
    await postCategory()
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
  }
  const getCategorys = async () => {
    try {
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const { data: categories, error: categoryError } = useQuery<Category[]>({
    queryKey: ["categorys"],
    queryFn: getCategorys
  })
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-9">
        Catagories
      </h1>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmitCategory}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create a Category</h3>
        <Input
          name="categoryName"
          className="mt-4"
          type="text"
          placeholder="Category Name"
          onChange={handleChangeCategory}
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Table of Catagories
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>ID</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((aCategory) => (
            <TableRow key={aCategory.id}>
              <TableCell className="font-medium text-left">{aCategory.categoryName}</TableCell>
              <TableCell className="text-left">{aCategory.id}</TableCell>
              <TableCell className="text-left">
                <DeleteCategoryBtn id={aCategory.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
