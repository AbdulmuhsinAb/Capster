import { Link } from "react-router-dom"

export function Hero() {
  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32">
      <div className="container space-y-10 xl:space-y-16">
        <div className="grid gap-4 px-10 md:grid-cols-2 md:gap-16">
          <div>
            <img
              alt="Hero Product"
              className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full"
              height="550"
              src="https://nocapstore.com/cdn/shop/products/velvet-288508.jpg?v=1689096022&width=1206"
              width="550"
            />
          </div>
          <div className="flex flex-col items-start space-y-4">
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] text-[#987070] dark:text-[#DBB5B5]">
              Stylish Caps and Beanies
            </h1>
            <p className="mx-auto max-w-[700px] text-[#987070] md:text-xl dark:text-[#F1E5D1]">
              Elevate your look with our premium caps and beanies. Crafted with care for the modern
              individual.
            </p>
            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-[#987070] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#DBB5B5] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#987070] disabled:pointer-events-none disabled:opacity-50 dark:bg-[#DBB5B5] dark:text-gray-900 dark:hover:bg-[#987070]/90 dark:focus-visible:ring-[#987070]"
              to="/catalog"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
