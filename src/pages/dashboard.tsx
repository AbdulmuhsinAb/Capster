import { useContext, useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import api from "@/api"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Context } from "@/App"

export function Dashboard() {
  const queryClient = useQueryClient()
  const context = useContext(Context)
  if (!context) throw Error
  const { state } = context
  const products = state.products.items

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }

  const postUser = async () => {
    try {
      const res = await api.post("/users/signup", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    await postUser()
    queryClient.invalidateQueries({ queryKey: ["users"] })
  }

  return (
    <>
      <form className="mt-20 w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Sign Up Now !!</h3>
        <Input
          name="fullName"
          className="mt-4"
          type="text"
          placeholder="name"
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
          Sign Up
        </Button>
      </form>
      <div>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Products
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Color</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-left">{product.name}</TableCell>
                <TableCell className="text-left">{product.price}$</TableCell>
                <TableCell className="text-left">{product.color}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
