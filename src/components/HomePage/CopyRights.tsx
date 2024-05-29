import { Link } from "react-router-dom"

export function CopyRights() {
  return (
    <footer className="flex flex-col gap-2 sticky sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-[#F1E5D1] dark:border-[#374151]">
      <p className="text-xs text-[#987070] dark:text-[#F1E5D1]">
        © 2024 Capster. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
          to="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs hover:underline underline-offset-4 text-[#987070] dark:text-[#DBB5B5]"
          to="#"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  )
}
