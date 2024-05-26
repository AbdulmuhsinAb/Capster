import { UserDashboard } from "@/components/User/UserDashboard"
import { ProductDashboard } from "@/components/Product/ProductDashboard"
import { CategoryDashboard } from "@/components/Category/CategoryDashboard"
import { NavBar } from "@/components/navbar"

export function Dashboard() {
  return (
    <>
      <NavBar />
      <UserDashboard />
      <ProductDashboard />
      <CategoryDashboard />
    </>
  )
}
