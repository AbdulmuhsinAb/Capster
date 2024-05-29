import { InstagramIcon, MailIcon, TwitterIcon } from "lucide-react"
import { Link } from "react-router-dom"

export function Contacts() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#987070] dark:text-[#DBB5B5]">
            Contact Us
          </h2>
          <p className="mx-auto max-w-[700px] text-[#987070] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#F1E5D1]">
            Get in touch with us for any inquiries or feedback.
          </p>
        </div>
        <div className="flex justify-center gap-6">
          <Link
            className="text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]"
            to="#"
          >
            <TwitterIcon className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            className="text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]"
            to="#"
          >
            <InstagramIcon className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            className="text-[#987070] hover:text-[#987070] dark:text-[#F1E5D1] dark:hover:text-[#DBB5B5]"
            to="#"
          >
            <MailIcon className="h-6 w-6" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
