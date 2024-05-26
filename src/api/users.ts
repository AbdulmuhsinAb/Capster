import { User } from "@/types"
import api from "."
type UserCreate = {
  fullName: string
  email: string
  password: string
}
export default {
  createOne: async (user: UserCreate) => {
    try {
      const res = await api.post("/users/signup", user)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (targetUserId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.delete("/users/" + targetUserId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  getAll: async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  updateOne: async (updatedUser: UserCreate, userId: string) => {
    try {
      const res = await api.patch("/users/" + userId, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
