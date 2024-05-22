import { UserDashboard } from "@/components/User/UserDashboard"
import { ProductDashboard } from "@/components/Product/ProductDashboard"
import { CategoryDashboard } from "@/components/Category/CategoryDashboard"

export function Dashboard() {
  return (
    <>
      <UserDashboard />
      <ProductDashboard />
      <CategoryDashboard />
    </>
  )
}
