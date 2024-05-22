import { ChangeEvent, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { TableHeader, TableRow, TableHead, TableBody, TableCell, Table } from "../ui/table"
import { User } from "@/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import UserService from "../../api/users"
import { EditUserBtn } from "./EditUserBtn"
import { DeleteUserBtn } from "./DeleteUserBtn"

export function UserDashboard() {
  const queryClient = useQueryClient()
  // creeate user
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    await UserService.createOne(user)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  const [deleteId, setDeleteId] = useState("")

  const handleSubmitDelete = async (e: any) => {
    e.preventDefault()
    await UserService.deleteOne(deleteId)
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  const handleChangeDelete = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDeleteId(value)
  }

  const { data: users, error: userError } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: UserService.getAll
  })
  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Users</h1>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Create a user</h3>
        <Input
          name="fullName"
          className="mt-4"
          type="text"
          placeholder="Full Name"
          onChange={handleChange}
        />
        <Input
          name="email"
          className="mt-4"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Input
          name="password"
          className="mt-4"
          type="text"
          placeholder="Password"
          onChange={handleChange}
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmitDelete}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Delete a user</h3>
        <Input
          name="userId"
          className="mt-4"
          type="text"
          placeholder="User ID"
          onChange={handleChangeDelete}
        />
        <Button type="submit" className="mt-4">
          Delete
        </Button>
      </form>

      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Table of Users
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Full Name</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((aUser) => (
              <TableRow key={aUser.userId}>
                <TableCell className="font-medium text-left">{aUser.fullName}</TableCell>
                <TableCell className="text-left">{aUser.userId}</TableCell>
                <TableCell className="text-left">{aUser.email}</TableCell>
                <TableCell className="text-left">{aUser.role}</TableCell>
                <TableCell className="text-left">
                  <DeleteUserBtn id={aUser.userId} />
                  <EditUserBtn user={aUser} id={aUser.userId} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
