import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"

import heroImage from "../../assets/images/Hero.jpg"

function Hero() {
  return (
    <section className="relative min-h-[650px] flex items-center overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">

        <div className="max-w-3xl text-white">

          <p className="uppercase tracking-[0.25em] text-green-300 font-semibold mb-5">
            Wildlife Conservation
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Protect Wildlife.
            <span className="block text-green-300">
              Preserve Our Future.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-8 max-w-2xl">
            Together, we can create a safer, healthier and more
            sustainable world for wildlife and future generations.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link
              to="/wildlife"
              className="inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-400 text-white px-7 py-3.5 rounded-full font-semibold transition"
            >
              Explore Wildlife
              <FaArrowRight />
            </Link>

            <Link
              to="/join"
              className="inline-flex items-center justify-center gap-3 border border-white text-white hover:bg-white hover:text-green-900 px-7 py-3.5 rounded-full font-semibold transition"
            >
              Join the Mission
            </Link>

          </div>

        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      {/* <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white text-sm flex flex-col items-center gap-2">
        <span>Scroll to explore</span>

        <div className="w-5 h-8 border-2 border-white/70 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white rounded-full mt-1.5" />
        </div>
      </div> */}

    </section>
  )
}

export default Hero