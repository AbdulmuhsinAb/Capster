export type Product = {
  id: string
  categoryId: string
  name: string
  description: string
  stock: number
  price: number
  color: string
  img: string
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
export const ROLE = {
  Admin: "Admin",
  User: "User"
} as const
export type DecodedUser = {
  aud: string
  emailaddress: string
  exp: number
  iss: string
  name: string
  nameidentifier: string
  role: keyof typeof ROLE
}
