import { Link } from "react-router-dom"
import { FaArrowRight, FaHeart, FaUsers } from "react-icons/fa6"

function CallToAction() {
  return (
    <section className="relative py-20 overflow-hidden bg-green-900">
      
      {/* Background decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-green-700 rounded-full opacity-40" />
      <div className="absolute -bottom-32 -left-20 w-80 h-80 bg-green-950 rounded-full opacity-50" />

      <div className="relative max-w-5xl mx-auto px-6 text-center text-white">

        <p className="text-green-300 font-semibold uppercase tracking-widest text-sm mb-4">
          Take Action
        </p>

        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Be a Voice for Wildlife
        </h2>

        <p className="max-w-2xl mx-auto mt-5 text-green-100 leading-7 text-lg">
          Protecting wildlife is a shared responsibility. Join our
          community and take meaningful steps toward a safer future
          for wildlife and nature.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-9">

          <Link
            to="/join"
            className="inline-flex items-center justify-center gap-3 bg-white text-green-900 px-7 py-3.5 rounded-full font-semibold hover:bg-green-100 transition"
          >
            <FaUsers />
            Join the Mission
            <FaArrowRight className="text-sm" />
          </Link>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-3 border border-white/70 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white hover:text-green-900 transition"
          >
            <FaHeart />
            Get Involved
          </Link>

        </div>

      </div>
    </section>
  )
}

export default CallToAction