import { Button } from "../ui/button"
import { Input } from "../ui/input"

export function NewsLetter() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-[#F1E5D1] dark:bg-[#1F2937]">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#987070] dark:text-[#DBB5B5]">
            Subscribe to Our Newsletter
          </h2>
          <p className="mx-auto max-w-[700px] text-[#987070] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#F1E5D1]">
            Stay up-to-date with our latest products, promotions, and exclusive offers.
          </p>
        </div>
        <div className="w-full max-w-md">
          <form className="flex space-x-2">
            <Input
              className="flex-1  border-[#F1E5D1] dark:border-[#374151] text-[#987070] dark:text-[#F1E5D1]"
              placeholder="Enter your email"
              type="email"
            />
            <Button
              className="bg-[#987070] text-gray-50 hover:bg-[#DBB5B5] dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90"
              type="submit"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
