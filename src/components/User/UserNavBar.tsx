import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { GraduationCapIcon, LogIn, LogOut } from "lucide-react"
import { Cart } from "../Cart"
import { useContext } from "react"
import { Context } from "@/App"

export function UserNavBar() {
  const context = useContext(Context)
  if (!context) throw Error
  const { state, handleRemoveUser } = context

  const handleLogout = () => {
    if (typeof window !== undefined) window.location.reload()
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    handleRemoveUser()
  }

  if (!state.user)
    return (
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="/">
          <img
            src="https://i.ibb.co/YBjW7C5/Screenshot-2024-05-28-at-10-02-52-PM.png"
            alt=""
            className="h-6 w-auto"
          />
        </Link>
        <nav className="ml-auto  mt-2 flex gap-4 sm:gap-6">
          <Link
            className="text-sm mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
            to="/"
          >
            Home
          </Link>
          <Link
            className="text-sm mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
            to="/Catalog"
          >
            Catalog
          </Link>
          <Link
            className="text-sm  mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
            to="#"
          >
            Contact
          </Link>
          <div className="flex justify-evenly">
            <Button variant="link" className=" pb-6">
              <Link
                className="text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]"
                to="/login"
              >
                <LogIn className="w-6 h-5" href="login" />
              </Link>
            </Button>
            <Cart />
          </div>
        </nav>
      </header>
    )

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" to="/">
        <img
          src="https://i.ibb.co/YBjW7C5/Screenshot-2024-05-28-at-10-02-52-PM.png"
          alt=""
          className="h-6 w-auto"
        />
      </Link>
      <nav className="ml-auto flex mt-2 gap-4 sm:gap-6">
        <Link
          className="text-sm mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-sm mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
          to="/Catalog"
        >
          Catalog
        </Link>
        <Link
          className="text-sm  mt-1 font-medium hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
          to="#"
        >
          Contact
        </Link>
        <div className="flex justify-evenly">
          <Button variant="link" className=" pb-6" onClick={handleLogout}>
            <LogOut className="w-6 h-5 text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]" />
          </Button>
          <Cart />
        </div>
      </nav>
    </header>
  )
}
