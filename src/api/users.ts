import { User } from "@/types"
import api from "."

export default {
  createOne: async (user) => {
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
      const res = await api.delete("/users/" + targetUserId)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  getAll: async () => {
    try {
      const res = await api.get("/users")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  updateOne: async (updatedUser, userId: string) => {
    try {
      const res = await api.patch("/users/" + userId, updatedUser)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
