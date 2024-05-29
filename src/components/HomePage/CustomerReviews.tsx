import { Card, CardContent } from "../ui/card"

export function CustomerReviews() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#987070] dark:text-[#DBB5B5]">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-[700px] text-[#987070] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-[#F1E5D1]">
            Hear from our satisfied customers about their experience with our products.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full w-12 h-12 bg-[#987070] dark:bg-[#DBB5B5] text-3xl flex items-center justify-center">
                JD
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-[#987070] dark:text-[#DBB5B5]">John Doe</h3>
                <p className="text-[#987070] dark:text-[#F1E5D1]">
                  "The beanie I bought is so cozy and stylish. I love it!"
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full w-12 h-12 bg-[#987070] dark:bg-[#DBB5B5] text-3xl flex items-center justify-center">
                JA
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-[#987070] dark:text-[#DBB5B5]">
                  Jane Appleseed
                </h3>
                <p className="text-[#987070] dark:text-[#F1E5D1]">
                  "The cap I bought fits perfectly and looks great. Highly recommend!"
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="rounded-full w-12 h-12 bg-[#987070] dark:bg-[#DBB5B5] text-3xl flex items-center justify-center">
                SM
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-bold text-[#987070] dark:text-[#DBB5B5]">
                  Sarah Mayer
                </h3>
                <p className="text-[#987070] dark:text-[#F1E5D1]">
                  "I'm so happy with my purchase. The quality is amazing!"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
