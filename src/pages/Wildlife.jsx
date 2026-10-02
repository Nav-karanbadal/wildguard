import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import WildlifeCard from "../components/WildlifeCard/WildlifeCard"
import WildlifeCharts from "../components/WildlifeCharts/WildlifeCharts"

import { getWildlife } from "../redux/wildlifeSlice"


// Load all wildlife images from assets/images
const imageFiles = import.meta.glob(
  "../assets/images/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)


// Get all wildlife image URLs
const wildlifeImages = Object.values(imageFiles)


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


function Wildlife() {

  const dispatch = useDispatch()


  const {
    animals,
    loading,
    error,
  } = useSelector((state) => state.wildlife)


  // Wildlife header slideshow
  const [shuffledImages, setShuffledImages] =
    useState([])

  const [currentImage, setCurrentImage] =
    useState(0)


  // Search and filter
  const [searchTerm, setSearchTerm] =
    useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All Wildlife")


  // View more / show less
  const [showAllWildlife, setShowAllWildlife] =
    useState(false)


  // Fetch wildlife data
  useEffect(() => {

    dispatch(getWildlife())

  }, [dispatch])


  /*
   * Shuffle all wildlife images when
   * the Wildlife page loads.
   */
  useEffect(() => {

    if (wildlifeImages.length > 0) {

      setShuffledImages(
        shuffleImages(wildlifeImages)
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
   * Preload the next slideshow image.
   *
   * This allows the next image to be downloaded
   * while the current image is being displayed.
   */
  useEffect(() => {

    if (shuffledImages.length <= 1) {
      return
    }


    const nextImage =
      shuffledImages[
      (currentImage + 1) %
      shuffledImages.length
      ]


    const image = new Image()

    image.src = nextImage


  }, [currentImage, shuffledImages])


  /*
   * Format API wildlife data.
   */
  const formattedAnimals = animals.map((animal) => ({

    id: animal.ID,

    name: animal["Animal Name"],

    scientificName: animal.Species,

    status: animal["Conservation Status"],

    description:
      `${animal["Animal Name"]} lives in ${animal.Habitat} habitats and has a ${animal.Diet.toLowerCase()} diet.`,

    habitat: animal.Habitat,

    diet: animal.Diet,

    lifespan:
      animal["Average Lifespan (Years)"],

    weight:
      animal["Weight (kg)"],

    height:
      animal["Height (cm)"],

    speed:
      animal["Speed (km/h)"],

  }))


  /*
   * Search and filter wildlife.
   */
  const filteredAnimals =
    formattedAnimals.filter((animal) => {

      const matchesSearch =
        animal.name
          .toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          )


      const matchesCategory =
        selectedCategory === "All Wildlife" ||
        animal.status === selectedCategory


      return matchesSearch && matchesCategory

    })


  /*
   * Show only 6 wildlife initially.
   * Show all wildlife after clicking
   * "View More Wildlife".
   */
  const displayedAnimals =
    showAllWildlife
      ? filteredAnimals
      : filteredAnimals.slice(0, 6)


  /*
   * Conservation status counts.
   */
  const criticallyEndangeredCount =
    formattedAnimals.filter(
      (animal) =>
        animal.status === "Critically Endangered"
    ).length


  const endangeredCount =
    formattedAnimals.filter(
      (animal) =>
        animal.status === "Endangered"
    ).length


  const vulnerableCount =
    formattedAnimals.filter(
      (animal) =>
        animal.status === "Vulnerable"
    ).length


  const nearThreatenedCount =
    formattedAnimals.filter(
      (animal) =>
        animal.status === "Near Threatened"
    ).length


  const leastConcernCount =
    formattedAnimals.filter(
      (animal) =>
        animal.status === "Least Concern"
    ).length


  /*
   * Reset "View More" when search/filter changes.
   */
  useEffect(() => {

    setShowAllWildlife(false)

  }, [searchTerm, selectedCategory])


  return (

    <div>


      {/* Page Header */}

      <section className="relative h-[560px] md:h-[620px] overflow-hidden text-white">


        {/* Current Wildlife Image */}

        {shuffledImages.length > 0 && (

          <img
            src={shuffledImages[currentImage]}
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          />

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
                Wildlife Conservation
              </p>


              <h1 className="text-4xl md:text-6xl font-bold leading-tight">

                Discover the Wildlife

                <span className="block text-green-300">
                  We Protect
                </span>

              </h1>


              <p className="mt-6 text-lg text-green-100 leading-8 max-w-2xl">

                Explore India's remarkable wildlife, learn about
                threatened species and discover why protecting their
                habitats matters for our future.

              </p>


            </div>

          </div>

        </div>


        {/* Slideshow Indicators

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

      <section className="py-10 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-3xl">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Our Wildlife
            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Every Species Has a Role
            </h2>


            <p className="mt-5 text-gray-600 leading-8">

              From forests and grasslands to wetlands and mountains,
              India's diverse ecosystems support an incredible variety
              of wildlife. Understanding these species is an important
              step toward protecting them.

            </p>

          </div>

        </div>

      </section>


      {/* Search */}

      <section className="py-6 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl">

            <label
              htmlFor="wildlife-search"
              className="block text-sm font-semibold text-green-950 mb-2"
            >
              Search Wildlife
            </label>


            <input
              id="wildlife-search"
              type="text"
              placeholder="Search by animal name..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

        </div>

      </section>


      {/* Categories */}

      <section className="py-6 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap gap-3">

            {[
              "All Wildlife",
              "Critically Endangered",
              "Endangered",
              "Vulnerable",
              "Near Threatened",
              "Least Concern",
            ].map((category) => (

              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`px-5 py-2.5 rounded-full font-medium transition ${selectedCategory === category
                    ? "bg-green-700 text-white"
                    : "bg-white text-gray-700 border border-gray-200 hover:border-green-600 hover:text-green-700"
                  }`}
              >
                {category}
              </button>

            ))}

          </div>

        </div>

      </section>


      {/* Wildlife Cards */}

      <section className="py-10 pb-16 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-8">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Explore Species
            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Wildlife We Protect
            </h2>


            <p className="mt-4 text-gray-600">
              Learn about some of the remarkable species in our
              wildlife database.
            </p>

          </div>


          {/* Loading */}

          {loading && (

            <div className="text-center py-16">

              <p className="text-lg font-medium text-green-700">
                Loading wildlife data...
              </p>

            </div>

          )}


          {/* Error */}

          {!loading && error && (

            <div className="text-center py-16">

              <h3 className="text-xl font-semibold text-red-600">
                Unable to load wildlife data
              </h3>


              <p className="text-gray-500 mt-2">
                {error}
              </p>


              <button
                onClick={() =>
                  dispatch(getWildlife())
                }
                className="mt-5 px-5 py-2.5 rounded-lg bg-green-700 text-white font-medium hover:bg-green-800 transition"
              >
                Try Again
              </button>

            </div>

          )}


          {/* Cards */}

          {!loading && !error && (

            filteredAnimals.length > 0 ? (

              <>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                  {displayedAnimals.map((animal) => (

                    <WildlifeCard
                      key={animal.id}
                      animal={animal}
                    />

                  ))}

                </div>


                {/* View More / Show Less */}

                {filteredAnimals.length > 6 && (

                  <div className="flex justify-center mt-10">

                    <button
                      onClick={() =>
                        setShowAllWildlife(
                          !showAllWildlife
                        )
                      }
                      className="px-6 py-3 rounded-full bg-green-700 text-white font-semibold hover:bg-green-800 transition"
                    >
                      {showAllWildlife
                        ? "Show Less"
                        : "View More Wildlife"}
                    </button>

                  </div>

                )}

              </>

            ) : (

              <div className="text-center py-16">

                <h3 className="text-xl font-semibold text-gray-700">
                  No wildlife found
                </h3>


                <p className="text-gray-500 mt-2">
                  Try searching for another species.
                </p>

              </div>

            )

          )}

        </div>

      </section>


      {/* Wildlife Statistics */}

      <section className="py-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-10">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Wildlife Overview
            </p>


            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Wildlife at a Glance
            </h2>


            <p className="mt-4 text-gray-600">
              A quick overview of the species currently featured in our
              wildlife database.
            </p>

          </div>


          {/* Statistics */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">


            {/* Total Species */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-green-700">
                {formattedAnimals.length}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Total Species
              </p>

            </div>


            {/* Critically Endangered */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-red-800">
                {criticallyEndangeredCount}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Critically Endangered
              </p>

            </div>


            {/* Endangered */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-red-600">
                {endangeredCount}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Endangered
              </p>

            </div>


            {/* Vulnerable */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-orange-500">
                {vulnerableCount}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Vulnerable
              </p>

            </div>


            {/* Near Threatened */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-yellow-600">
                {nearThreatenedCount}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Near Threatened
              </p>

            </div>


            {/* Least Concern */}

            <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

              <p className="text-4xl font-bold text-green-600">
                {leastConcernCount}
              </p>

              <p className="mt-2 text-gray-600 font-medium">
                Least Concern
              </p>

            </div>


          </div>

        </div>

      </section>


      {/* Charts */}

      <WildlifeCharts
        animals={formattedAnimals}
      />


    </div>

  )

}


export default Wildlife