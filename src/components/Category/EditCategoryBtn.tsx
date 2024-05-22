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
import CategoryService from "../../api/categories"
import { ChangeEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { Category } from "@/types"

type EditCategoryProps = {
  category: Category
  id: string
}

export function EditCategoryBtn({ category, id }: EditCategoryProps) {
  const queryClient = useQueryClient()
  const [updatedCategory, setUpdatedCategory] = useState({
    categoryName: category.categoryName
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedCategory({
      ...updatedCategory,
      [name]: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(updatedCategory)
    await CategoryService.updateOne(updatedCategory, id)
    queryClient.invalidateQueries({ queryKey: ["categorys"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Category Name</DialogTitle>
          <DialogDescription>
            Make changes to your user details here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              name="categoryName"
              defaultValue={category.categoryName}
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
