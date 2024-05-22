import api from "."

export default {
  createOne: async (category) => {
    try {
      const res = await api.post("/categorys", category)
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
      const res = await api.delete("/categorys/" + targetCategoryId)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  updateOne: async (updatedCategory, categoryId: string) => {
    try {
      const res = await api.patch("/categorys/" + categoryId, updatedCategory)
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }
}
