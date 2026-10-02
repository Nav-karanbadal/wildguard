import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {
  FaPaw,
  FaTree,
  FaWater,
  FaArrowRight,
} from "react-icons/fa6"

import { getPrograms } from "../../redux/programSlice"

function ProgramsPreview() {
  const dispatch = useDispatch()

  const {
    programs,
    loading,
    error,
  } = useSelector((state) => state.programs)

  const [cardsPerView, setCardsPerView] = useState(3)
  const [currentGroup, setCurrentGroup] = useState(0)

  // Fetch programs
  useEffect(() => {
    if (programs.length === 0) {
      dispatch(getPrograms())
    }
  }, [dispatch, programs.length])

  // Responsive number of cards
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        // Mobile
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        // Tablet
        setCardsPerView(2)
      } else {
        // Desktop
        setCardsPerView(3)
      }
    }

    updateCardsPerView()

    window.addEventListener(
      "resize",
      updateCardsPerView
    )

    return () => {
      window.removeEventListener(
        "resize",
        updateCardsPerView
      )
    }
  }, [])

  // Reset carousel when screen size changes
  useEffect(() => {
    setCurrentGroup(0)
  }, [cardsPerView])

  /*
    Every program becomes a starting point.

    Example on tablet:

    1,2
    2,3
    3,4
    ...
    12,1
  */
  const totalGroups = programs.length

  // Automatically change programs every 5 seconds
  useEffect(() => {
    if (totalGroups <= 1) return

    const interval = setInterval(() => {
      setCurrentGroup((previousGroup) => {
        const nextGroup = previousGroup + 1

        if (nextGroup >= totalGroups) {
          return 0
        }

        return nextGroup
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [totalGroups])

  // Create circular list of visible programs
  const visiblePrograms = Array.from({
    length: Math.min(
      cardsPerView,
      programs.length
    ),
  }).map((_, index) => {

    const programIndex =
      (currentGroup + index) % programs.length

    return programs[programIndex]
  })

  // Icons for cards
  const getIcon = (index) => {
    if (index === 0) return <FaPaw />
    if (index === 1) return <FaTree />
    return <FaWater />
  }

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
            Conservation Programs
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-green-950">
            Working Together for Wildlife
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Explore conservation programs focused on protecting wildlife,
            restoring habitats and creating a sustainable future.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-green-700 font-medium">
              Loading programs...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="text-center py-12">
            <p className="text-red-600 font-medium">
              Unable to load programs.
            </p>
          </div>
        )}

        {/* Program Cards */}
        {!loading &&
          !error &&
          visiblePrograms.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {visiblePrograms.map((program, index) => (

                <div
                  key={`${program.ID}-${currentGroup}-${index}`}
                  className="group bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-2xl group-hover:bg-green-700 group-hover:text-white transition duration-300">
                    {getIcon(index)}
                  </div>

                  {/* Content */}
                  <div className="mt-7">

                    {/* Program Name */}
                    <h3 className="text-xl font-bold text-green-950 line-clamp-2 min-h-[56px]">
                      {program["Program Name"]}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-7 mt-4 line-clamp-4">
                      {program.Description}
                    </p>

                    {/* Learn More */}
                    <Link
                      to={`/programs/${program.ID}`}
                      className="inline-flex items-center gap-2 mt-6 text-green-700 font-semibold hover:text-green-900 transition"
                    >
                      Learn more

                      <FaArrowRight
                        className="text-sm group-hover:translate-x-1 transition"
                      />
                    </Link>

                  </div>

                </div>

              ))}

            </div>

          )}

        {/* Carousel Indicators */}
        {!loading &&
          !error &&
          totalGroups > 1 && (

            <div className="flex justify-center items-center gap-2 mt-8">

              {Array.from({
                length: totalGroups,
              }).map((_, index) => (

                <button
                  key={index}
                  onClick={() => {
                    setCurrentGroup(index)
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === currentGroup
                      ? "w-8 bg-green-700"
                      : "w-2.5 bg-gray-300 hover:bg-green-400"
                    }`}
                  aria-label={`Show program group ${index + 1}`}
                />

              ))}

            </div>

          )}

        {/* Explore All Programs Button */}
        {!loading &&
          !error &&
          programs.length > 0 && (

            <div className="flex justify-center mt-10">

              <Link
                to="/programs"
                className="group inline-flex items-center gap-3 border-2 border-green-700 text-green-700 px-7 py-3.5 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all duration-300"
              >

                <span>
                  Explore All Programs
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

export default ProgramsPreview