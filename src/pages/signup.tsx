import api from "@/api"
import { CopyRights } from "@/components/HomePage/CopyRights"
import { NavBar } from "@/components/NavBar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useQueryClient } from "@tanstack/react-query"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

type UserCredentials = {
  fullName: string
  email: string
  password: string
}

export function Signup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [credentials, setCredentials] = useState({
    fullName: "",
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
  const signup = async (userCredentials: UserCredentials) => {
    try {
      const res = await api.post("/users/signup", userCredentials)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await signup(credentials)
    if (response) {
      navigate("/login")
    }
  }
  return (
    <div>
      <NavBar />
      <form className="w-full md:w-1/3 mx-auto" onSubmit={handleSubmit}>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-[#987070]">
          Sign Up
        </h3>
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
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="flex flex-col justify-between">
          <Button
            type="submit"
            className="mt-4 inline-flex items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
          >
            Sign Up
          </Button>
          <Button variant="link" className="mt-4 text-[#987070]">
            <Link to="/login">Already have an account ?</Link>
          </Button>
        </div>
      </form>
      <CopyRights />
    </div>
  )
}
