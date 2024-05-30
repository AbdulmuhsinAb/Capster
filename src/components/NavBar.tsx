import { useContext } from "react"
import { Context } from "@/App"
import { ROLE } from "@/types"
import { AdminNavBar } from "./AdminNavBar"
import { UserNavBar } from "./User/UserNavBar"

export function NavBar() {
  const context = useContext(Context)
  if (!context) throw Error
  const { state } = context
  if (state.user?.role === ROLE.Admin)
    return (
      <div className="sticky top-0 bg-white">
        <AdminNavBar />
      </div>
    )

  return (
    <div className="sticky top-0 bg-white">
      <UserNavBar />
    </div>
  )
}
