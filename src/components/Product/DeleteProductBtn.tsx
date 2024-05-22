import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@radix-ui/react-alert-dialog"
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import ProductService from "../../api/products"
import { useQueryClient } from "@tanstack/react-query"

export function DeleteProductBtn({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const deleteButton = async (id: string) => {
    await ProductService.deleteOne(id)
    queryClient.invalidateQueries({ queryKey: ["products"] })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="ml-2" variant="destructive">
          X
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the product and remove its
            data from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteButton(id)}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
