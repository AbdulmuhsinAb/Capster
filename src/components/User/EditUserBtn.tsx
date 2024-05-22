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
import { User } from "@/types"
import UserService from "../../api/users"
import { ChangeEvent, useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

type EditUserProps = {
  user: User
  id: string
}

export function EditUserBtn({ user, id }: EditUserProps) {
  const queryClient = useQueryClient()
  const [updatedUser, setUpdatedUser] = useState({
    fullName: user.fullName,
    email: user.email,
    password: ""
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUpdatedUser({
      ...updatedUser,
      [name]: value
    })
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    console.log(updatedUser)
    await UserService.updateOne(updatedUser, id)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User Details</DialogTitle>
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
              name="fullName"
              defaultValue={user.fullName}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Email</Label>
            <Input
              name="email"
              defaultValue={user.email}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Password</Label>
            <Input name="password" defaultValue="" className="col-span-3" onChange={handleChange} />
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
