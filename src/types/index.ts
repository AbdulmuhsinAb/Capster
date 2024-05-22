export type Product = {
  id: string
  categoryId: number
  name: string
  description: string
  stock: number
  price: number
  color: string
}
export type Category = {
  id: string
  categoryName: string
}
export type User = {
  userId: string
  fullName: string
  role: string
  email: string
}
