import api from "."
type CreateCategory = {
  categoryName: string
}
export default {
  createOne: async (category: CreateCategory) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/categorys", category, {
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
      const res = await api.get("/categorys")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (targetCategoryId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.delete("/categorys/" + targetCategoryId, {
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
  updateOne: async (updatedCategory: CreateCategory, categoryId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.patch("/categorys/" + categoryId, updatedCategory, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
