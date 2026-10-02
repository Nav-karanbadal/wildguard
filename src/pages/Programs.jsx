import { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"

import ProgramCard from "../components/ProgramCard/ProgramCard"

// import ProgramCharts from "../components/ProgramCharts/ProgramCharts"

import { getPrograms } from "../redux/programSlice"

import {
  FaPaw,
  FaTree,
  FaWater,
  FaSeedling,
} from "react-icons/fa6"


// Load all images from assets/images
const imageFiles = import.meta.glob(
  "../assets/images/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)

// Get all image URLs
const programImages = Object.values(imageFiles)


// Shuffle images randomly
function shuffleImages(images) {

  const shuffled = [...images]

  for (let i = shuffled.length - 1; i > 0; i--) {

    const randomIndex =
      Math.floor(Math.random() * (i + 1))

      ;[shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ]

  }

  return shuffled

}


function Programs() {

  const dispatch = useDispatch()


  const {
    programs,
    loading,
    error,
  } = useSelector((state) => state.programs)


  // Program header slideshow
  const [shuffledImages, setShuffledImages] =
    useState([])

  const [currentImage, setCurrentImage] =
    useState(0)


  const [searchTerm, setSearchTerm] =
    useState("")


  const [selectedCategory, setSelectedCategory] =
    useState("All Programs")


  const [showAllPrograms, setShowAllPrograms] =
    useState(false)


  // Fetch programs
  useEffect(() => {

    dispatch(getPrograms())

  }, [dispatch])


  /*
   * Shuffle all program header images
   * when the page loads.
   */
  useEffect(() => {

    if (programImages.length > 0) {

      setShuffledImages(
        shuffleImages(programImages)
      )

    }

  }, [])


  /*
   * Change header image every 5 seconds.
   */
  useEffect(() => {

    if (shuffledImages.length === 0) {
      return
    }

    const interval = setInterval(() => {

      setCurrentImage((previousImage) => {

        if (
          previousImage ===
          shuffledImages.length - 1
        ) {

          return 0

        }

        return previousImage + 1

      })

    }, 8000)


    return () => clearInterval(interval)

  }, [shuffledImages])


  /*
   * Convert API Current Status into
   * simple and clean filter groups.
   */
  const getStatusCategory = (status) => {

    const value =
      String(status || "").toLowerCase()


    if (value.includes("mixed")) {

      return "Mixed Results"

    }


    if (value.includes("recovery")) {

      return "Recovery"

    }


    if (
      value.includes("successful") ||
      value.includes("significant successes")
    ) {

      return "Successful"

    }


    if (
      value.includes("progress") ||
      value.includes("positive impact") ||
      value.includes("reduced poaching")
    ) {

      return "Progress"

    }


    if (value.includes("ongoing")) {

      return "Ongoing"

    }


    return "Ongoing"

  }


  /*
   * Convert API field names into simple names
   * that our components can use.
   */
  const formattedPrograms = programs.map(
    (program, index) => ({

      id: program.ID,

      title: program["Program Name"],


      // Clean filter category
      category: getStatusCategory(
        program["Current Status"]
      ),


      description: program.Description,

      country: program["Country/Region"],

      agency: program["Government Agency"],

      objectives:
        program["Objectives and Goals"],

      yearLaunched:
        program["Year Launched"],


      // Original API status
      status:
        program["Current Status"],


      funding:
        program["Funding (USD)"],

      duration:
        program.Duration,

      target:
        program["Target Species/Ecosystems"],


      /*
       * Icons for ProgramCard.
       */
      icon:
        index % 4 === 0
          ? <FaPaw />
          : index % 4 === 1
            ? <FaTree />
            : index % 4 === 2
              ? <FaWater />
              : <FaSeedling />,

    })
  )


  /*
   * Clean filter categories.
   */
  const categories = [

    "All Programs",

    "Ongoing",

    "Successful",

    "Progress",

    "Recovery",

    "Mixed Results",

  ]


  /*
   * Search and filter programs.
   */
  const filteredPrograms =
    formattedPrograms.filter(
      (program) => {

        const searchValue =
          searchTerm.toLowerCase()


        const matchesSearch =

          program.title
            .toLowerCase()
            .includes(searchValue) ||

          program.country
            .toLowerCase()
            .includes(searchValue) ||

          program.target
            .toLowerCase()
            .includes(searchValue)


        const matchesCategory =

          selectedCategory === "All Programs" ||

          program.category ===
          selectedCategory


        return (
          matchesSearch &&
          matchesCategory
        )

      }
    )


  /*
   * Show only 4 programs initially.
   * Show all programs after clicking
   * "View More Programs".
   */
  const displayedPrograms =
    showAllPrograms
      ? filteredPrograms
      : filteredPrograms.slice(0, 4)


  /*
   * Program statistics.
   */
  const totalPrograms =
    formattedPrograms.length


  const ongoingPrograms =
    formattedPrograms.filter(
      (program) =>
        program.status
          .toLowerCase()
          .includes("ongoing")
    ).length


  const successfulPrograms =
    formattedPrograms.filter(
      (program) =>
        program.status
          .toLowerCase()
          .includes("successful") ||

        program.status
          .toLowerCase()
          .includes(
            "significant successes"
          )
    ).length


  const countriesCount =
    new Set(
      formattedPrograms.map(
        (program) => program.country
      )
    ).size


  /*
   * Reset "Show More" when search/filter changes.
   */
  useEffect(() => {

    setShowAllPrograms(false)

  }, [searchTerm, selectedCategory])


  return (

    <div>


      {/* Page Header */}
      <section className="relative h-[560px] md:h-[620px] overflow-hidden text-white">


        {/* Rotating Program Images */}

        {shuffledImages.map(
          (image, index) => (

            <img
              key={image}
              src={image}
              alt=""
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage
                  ? "opacity-100"
                  : "opacity-0"
                }`}
            />

          )
        )}


        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />


        {/* Green Overlay */}
        <div className="absolute inset-0 bg-green-950/20" />


        {/* Header Content */}
        <div className="relative z-10 h-full flex items-center">

          <div className="max-w-7xl mx-auto px-6 w-full">

            <div className="max-w-3xl">


              <p className="text-green-300 uppercase tracking-[0.2em] font-semibold text-sm mb-4">

                Conservation Programs

              </p>


              <h1 className="text-4xl md:text-6xl font-bold leading-tight">

                Programs That

                <span className="block text-green-300">

                  Protect Our Wildlife

                </span>

              </h1>


              <p className="mt-6 text-lg text-green-100 leading-8 max-w-2xl">

                Explore conservation programs focused on
                protecting wildlife, restoring habitats and
                supporting communities across different regions.

              </p>


            </div>

          </div>

        </div>


        {/* Slideshow Indicator
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">

          {shuffledImages
            .slice(0, 5)
            .map((_, index) => (

              <span
                key={index}
                className={`h-1.5 rounded-full transition-all duration-500 ${index === currentImage % 5
                    ? "w-8 bg-white"
                    : "w-2 bg-white/50"
                  }`}
              />

            ))}

        </div> */}


      </section>



      {/* Introduction */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">

              Our Programs

            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">

              Turning Conservation Into Action

            </h2>


            <p className="mt-5 text-gray-600 leading-8">

              Conservation requires long-term action. Explore
              initiatives that work toward protecting wildlife,
              preserving natural habitats and supporting
              communities.

            </p>

          </div>

        </div>

      </section>



      {/* Search Programs */}
      <section className="py-6 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl">

            <label
              htmlFor="program-search"
              className="block text-sm font-semibold text-green-950 mb-2"
            >

              Search Programs

            </label>


            <input
              id="program-search"
              type="text"
              placeholder="Search by program, country or species..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

        </div>

      </section>



      {/* Program Categories */}
      <section className="py-5 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap gap-2.5">

            {categories.map(
              (category) => (

                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedCategory === category
                      ? "bg-green-700 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-green-600 hover:text-green-700"
                    }`}
                >

                  {category}

                </button>

              )
            )}

          </div>

        </div>

      </section>



      {/* Conservation Programs */}
      <section className="py-10 pb-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-8">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">

              Explore Programs

            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">

              Conservation in Action

            </h2>


            <p className="mt-4 text-gray-600 leading-7 max-w-2xl">

              Discover initiatives focused on protecting
              species, restoring habitats and creating
              stronger communities.

            </p>

          </div>



          {/* Loading */}
          {loading && (

            <div className="text-center py-16">

              <p className="text-lg font-medium text-green-700">

                Loading programs...

              </p>

            </div>

          )}



          {/* Error */}
          {!loading && error && (

            <div className="text-center py-16">

              <h3 className="text-xl font-semibold text-red-600">

                Unable to load programs

              </h3>


              <p className="text-gray-500 mt-2">

                {error}

              </p>


              <button
                onClick={() =>
                  dispatch(getPrograms())
                }
                className="mt-5 px-5 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition"
              >

                Try Again

              </button>

            </div>

          )}



          {/* Program Cards */}
          {!loading && !error && (

            filteredPrograms.length > 0 ? (

              <>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                  {displayedPrograms.map(
                    (program) => (

                      <ProgramCard
                        key={program.id}
                        program={program}
                      />

                    )
                  )}

                </div>



                {/* View More / Show Less */}
                {filteredPrograms.length > 4 && (

                  <div className="flex justify-center mt-10">

                    <button
                      onClick={() =>
                        setShowAllPrograms(
                          !showAllPrograms
                        )
                      }
                      className="px-6 py-3 rounded-full bg-green-700 text-white font-semibold hover:bg-green-800 transition"
                    >

                      {showAllPrograms
                        ? "Show Less"
                        : "View More Programs"}

                    </button>

                  </div>

                )}

              </>

            ) : (

              <div className="text-center py-16">

                <h3 className="text-xl font-semibold text-gray-700">

                  No programs found

                </h3>


                <p className="text-gray-500 mt-2">

                  Try searching for another program.

                </p>

              </div>

            )

          )}

        </div>

      </section>



      {/* Program Statistics */}
      <section className="py-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">

              Program Overview

            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">

              Conservation Programs at a Glance

            </h2>


            <p className="mt-4 text-gray-600">

              An overview of the conservation programs
              currently available in our database.

            </p>

          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">


            {/* Total Programs */}
            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <p className="text-4xl font-bold text-green-700">

                {totalPrograms}

              </p>


              <p className="mt-2 text-gray-600 font-medium">

                Total Programs

              </p>

            </div>



            {/* Ongoing */}
            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <p className="text-4xl font-bold text-green-700">

                {ongoingPrograms}

              </p>


              <p className="mt-2 text-gray-600 font-medium">

                Ongoing Programs

              </p>

            </div>



            {/* Successful */}
            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <p className="text-4xl font-bold text-green-700">

                {successfulPrograms}

              </p>


              <p className="mt-2 text-gray-600 font-medium">

                Successful Programs

              </p>

            </div>



            {/* Countries / Regions */}
            <div className="bg-gray-50 rounded-2xl p-7 text-center border border-gray-100">

              <p className="text-4xl font-bold text-green-700">

                {countriesCount}

              </p>


              <p className="mt-2 text-gray-600 font-medium">

                Countries / Regions

              </p>

            </div>


          </div>

        </div>

      </section>



      {/* Program Charts */}
      {/* <ProgramCharts programs={formattedPrograms} /> */}


    </div>

  )

}


export default Programs