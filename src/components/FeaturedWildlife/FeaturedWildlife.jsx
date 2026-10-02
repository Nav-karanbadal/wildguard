import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"

import WildlifeCard from "../WildlifeCard/WildlifeCard"
import { getWildlife } from "../../redux/wildlifeSlice"

function FeaturedWildlife() {
  const dispatch = useDispatch()

  const {
    animals,
    loading,
    error,
  } = useSelector((state) => state.wildlife)

  // Current group of 4 animals
  const [currentStart, setCurrentStart] = useState(0)

  // Fetch wildlife
  useEffect(() => {
    if (animals.length === 0) {
      dispatch(getWildlife())
    }
  }, [dispatch, animals.length])

  // Change the 4 featured animals every 10 seconds
  useEffect(() => {
    if (animals.length <= 4) {
      return
    }

    const interval = setInterval(() => {
      setCurrentStart((previousStart) => {
        const nextStart = previousStart + 4

        // Start again from the beginning
        if (nextStart >= animals.length) {
          return 0
        }

        return nextStart
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [animals.length])

  // Get current 4 animals
  const featuredAnimals = animals
    .slice(currentStart, currentStart + 4)
    .map((animal) => ({
      id: animal.ID,
      name: animal["Animal Name"],
      scientificName: animal.Species,
      status: animal["Conservation Status"],
      description: `${animal["Animal Name"]} lives in ${animal.Habitat} habitats and has a ${animal.Diet.toLowerCase()} diet.`,
      habitat: animal.Habitat,
      diet: animal.Diet,
      lifespan: animal["Average Lifespan (Years)"],
      weight: animal["Weight (kg)"],
      height: animal["Height (cm)"],
      speed: animal["Speed (km/h)"],
    }))

  return (
    <section className="bg-gray-50 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

          <div className="max-w-2xl">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Featured Wildlife
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Meet the Species We Protect
            </h2>

            <p className="mt-4 text-gray-600 leading-7">
              Discover some of the remarkable species that depend
              on our forests, grasslands and protected habitats.
            </p>

          </div>

          {/* Desktop Explore Button */}
          <Link
            to="/wildlife"
            className="hidden md:inline-flex group items-center gap-3 border-2 border-green-700 text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all duration-300"
          >
            <span>
              Explore All Wildlife
            </span>

            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 group-hover:bg-white group-hover:text-green-700 transition-all duration-300">

              <FaArrowRight
                className="text-sm group-hover:translate-x-1 transition-transform duration-300"
              />

            </span>

          </Link>

        </div>


        {/* Loading */}
        {loading && (
          <div className="py-12 text-center">

            <p className="text-green-700 font-semibold">
              Loading wildlife...
            </p>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="py-12 text-center">

            <p className="text-red-600 font-semibold">
              Unable to load wildlife.
            </p>

          </div>
        )}


        {/* Cards */}
        {!loading &&
          !error &&
          featuredAnimals.length > 0 && (

            <div
              key={currentStart}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-[fadeIn_0.8s_ease-in-out]"
            >

              {featuredAnimals.map((animal) => (

                <WildlifeCard
                  key={animal.id}
                  animal={animal}
                />

              ))}

            </div>

          )}


        {/* No data */}
        {!loading &&
          !error &&
          featuredAnimals.length === 0 && (

            <div className="py-12 text-center">

              <p className="text-gray-600">
                No wildlife available.
              </p>

            </div>

          )}


        {/* Slide indicators */}
        {!loading &&
          !error &&
          animals.length > 4 && (

            <div className="flex justify-center items-center gap-2 mt-8">

              {Array.from({
                length: Math.ceil(animals.length / 4),
              }).map((_, index) => {

                const isActive =
                  Math.floor(currentStart / 4) === index

                return (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStart(index * 4)
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${isActive
                        ? "w-8 bg-green-700"
                        : "w-2.5 bg-gray-300 hover:bg-green-400"
                      }`}
                    aria-label={`Show wildlife group ${index + 1}`}
                  />
                )

              })}

            </div>

          )}


        {/* Mobile Explore Button */}
        {!loading &&
          !error &&
          animals.length > 0 && (

            <div className="flex justify-center mt-10 md:hidden">

              <Link
                to="/wildlife"
                className="group inline-flex items-center gap-3 border-2 border-green-700 text-green-700 px-7 py-3.5 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all duration-300"
              >

                <span>
                  Explore All Wildlife
                </span>

                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 group-hover:bg-white group-hover:text-green-700 transition-all duration-300">

                  <FaArrowRight
                    className="text-sm group-hover:translate-x-1 transition-transform duration-300"
                  />

                </span>

              </Link>

            </div>

          )}

      </div>

    </section>
  )
}

export default FeaturedWildlife