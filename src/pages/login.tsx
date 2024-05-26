import api from "@/api"
import { NavBar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link } from "react-router-dom"

type UserCredentials = {
  email: string
  password: string
}

export function Login() {
  const queryClient = useQueryClient()
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value
    })
  }
  const login = async (userCredentials: UserCredentials) => {
    try {
      const res = await api.post("/users/login", userCredentials)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await login(credentials)
    localStorage.setItem("token:", response)

    queryClient.invalidateQueries({ queryKey: ["users"] })
  }
  return (
    <div>
      <NavBar />
      <form className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Log in</h3>
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
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="flex flex-col justify-between">
          <Button type="submit" className="mt-4">
            Log In
          </Button>
          <Button variant="link" className="mt-4">
            <Link to="/signup">Create an account</Link>
          </Button>
        </div>
      </form>
    </div>
  )
}
