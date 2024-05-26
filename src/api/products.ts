import api from "."

type ProductCreate = {
  categoryId: string
  name: string
  description: string
  img: string
  stock: number
  price: number
  color: string
}
export default {
  createOne: async (product: ProductCreate) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.post("/products", product, {
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
      const res = await api.get("/products")
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  },
  deleteOne: async (targetProductId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.delete("/products/" + targetProductId, {
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
  updateOne: async (updatedProduct: ProductCreate, productId: string) => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.patch("/products/" + productId, updatedProduct, {
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
