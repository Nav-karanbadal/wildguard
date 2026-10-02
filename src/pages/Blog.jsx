import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import BlogCard from "../components/BlogCard/BlogCard"

import { getBlogs } from "../redux/blogSlice"

// Load all local blog images
const imageFiles = import.meta.glob(
  "../assets/images/blogs/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)

// Get all blog image URLs
const blogImages = Object.values(imageFiles)

// Shuffle images
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

function Blog() {

  const dispatch = useDispatch()

  const {
    blogs,
    loading,
    error,
  } = useSelector((state) => state.blogs)

  const [searchTerm, setSearchTerm] = useState("")

  const [selectedCategory, setSelectedCategory] =
    useState("All Stories")

  // Slideshow
  const [shuffledImages, setShuffledImages] = useState([])

  const [currentImage, setCurrentImage] = useState(0)


  // Load blog data from API
  useEffect(() => {

    if (blogs.length === 0) {
      dispatch(getBlogs())
    }

  }, [dispatch, blogs.length])


  // Shuffle blog images when page loads
  useEffect(() => {

    if (blogImages.length > 0) {
      setShuffledImages(shuffleImages(blogImages))
    }

  }, [])


  // Change header image every 8 seconds
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
    Convert API Focus Area into one or more
    broad blog categories.
  */
  const getBlogCategories = (focusArea = "") => {

    const value = focusArea.toLowerCase()

    const categories = []


    // Conservation
    if (value.includes("conservation")) {
      categories.push("Conservation")
    }


    // Wildlife Protection
    if (
      value.includes("endangered") ||
      value.includes("species protection") ||
      value.includes("anti-poaching") ||
      value.includes("wildlife trade") ||
      value.includes("rhino") ||
      value.includes("elephant") ||
      value.includes("sanctuary") ||
      value.includes("big cats")
    ) {
      categories.push("Wildlife Protection")
    }


    // Habitat & Biodiversity
    if (
      value.includes("habitat") ||
      value.includes("biodiversity")
    ) {
      categories.push("Habitat & Biodiversity")
    }


    // Climate & Environment
    if (
      value.includes("climate") ||
      value.includes("pollution") ||
      value.includes("marine") ||
      value.includes("sustainable development")
    ) {
      categories.push("Climate & Environment")
    }


    // Community & Research
    if (
      value.includes("volunteer") ||
      value.includes("research") ||
      value.includes("fieldwork") ||
      value.includes("advocacy") ||
      value.includes("education") ||
      value.includes("funding") ||
      value.includes("policy")
    ) {
      categories.push("Community & Research")
    }


    // If nothing matched
    if (categories.length === 0) {
      categories.push("Conservation")
    }


    return [...new Set(categories)]
  }


  // Convert API data
  const formattedBlogs = blogs.map((blog) => ({

    id: blog.ID,

    title: blog["Blog Title"],

    category: blog["Focus Area"],

    description: blog.Description,

    author: blog["Author/Organization"],

    date: blog["Last Updated"],

    website: blog["Website URL"],

    socialLinks: blog["Social Media Links"],

    // A blog can have multiple broad categories
    mainCategories: getBlogCategories(
      blog["Focus Area"]
    ),

  }))


  // Main filters
  const categories = [
    "All Stories",
    "Conservation",
    "Wildlife Protection",
    "Habitat & Biodiversity",
    "Climate & Environment",
    "Community & Research",
  ]


  // Search + category filtering
  const filteredBlogs = formattedBlogs.filter((blog) => {

    const searchValue =
      searchTerm.toLowerCase().trim()


    const matchesSearch =
      blog.title?.toLowerCase().includes(searchValue) ||
      blog.description?.toLowerCase().includes(searchValue) ||
      blog.author?.toLowerCase().includes(searchValue) ||
      blog.category?.toLowerCase().includes(searchValue)


    const matchesCategory =
      selectedCategory === "All Stories" ||
      blog.mainCategories.includes(selectedCategory)


    return matchesSearch && matchesCategory

  })


  return (

    <div>

      {/* Page Header */}

      <section className="relative h-[560px] md:h-[620px] overflow-hidden text-white">

        {/* Blog Slideshow */}

        {shuffledImages.map((image, index) => (

          <img
            key={image}
            src={image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImage
                ? "opacity-100"
                : "opacity-0"
              }`}
          />

        ))}


        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Green Overlay */}
        <div className="absolute inset-0 bg-green-950/20" />


        {/* Header Content */}

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">

          <div className="max-w-3xl">

            <p className="text-green-300 uppercase tracking-[0.2em] font-semibold text-sm mb-4">
              Wildlife & Conservation
            </p>


            <h1 className="text-4xl md:text-6xl font-bold leading-tight">

              Stories That

              <span className="block text-green-300">
                Inspire Action
              </span>

            </h1>


            <p className="mt-6 text-lg text-green-100 leading-8 max-w-2xl">

              Discover wildlife stories, conservation insights and
              inspiring ideas that help us understand and protect
              the natural world.

            </p>

          </div>

        </div>


        {/* Slideshow Indicators

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">

          {shuffledImages.map((_, index) => (

            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${index === currentImage
                  ? "w-8 bg-green-300"
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
              Our Stories
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Learn. Discover. Take Action.
            </h2>

            <p className="mt-5 text-gray-600 leading-8">
              Explore stories about wildlife, conservation programs,
              environmental challenges and the people working to
              create a better future for nature.
            </p>

          </div>

        </div>

      </section>


      {/* Search Stories */}

      <section className="py-6 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="max-w-2xl">

            <label
              htmlFor="blog-search"
              className="block text-sm font-semibold text-green-950 mb-2"
            >
              Search Stories
            </label>

            <input
              id="blog-search"
              type="text"
              placeholder="Search by story title..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full px-5 py-3.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />

          </div>

        </div>

      </section>


      {/* Blog Categories */}

      <section className="py-8 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-wrap gap-3">

            {categories.map((category) => (

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


      {/* Blog Articles */}

      <section className="py-10 pb-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <div className="mb-8">

            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
              Latest Articles
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
              Wildlife & Conservation Stories
            </h2>

            <p className="mt-4 text-gray-600 leading-7 max-w-2xl">
              Read stories and insights about wildlife, conservation,
              communities and the environment.
            </p>

          </div>


          {/* Loading */}

          {loading && (

            <div className="py-16 text-center">

              <p className="text-green-700 font-semibold">
                Loading stories...
              </p>

            </div>

          )}


          {/* Error */}

          {!loading && error && (

            <div className="py-16 text-center">

              <p className="text-red-600 font-semibold">
                {error}
              </p>

            </div>

          )}


          {/* Blog Cards */}

          {!loading &&
            !error &&
            filteredBlogs.length > 0 && (

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredBlogs.map((blog) => (

                  <BlogCard
                    key={blog.id}
                    blog={blog}
                  />

                ))}

              </div>

            )}


          {/* No Results */}

          {!loading &&
            !error &&
            filteredBlogs.length === 0 && (

              <div className="py-16 text-center">

                <h3 className="text-xl font-bold text-green-950">
                  No stories found
                </h3>

                <p className="text-gray-600 mt-2">
                  Try a different search term or category.
                </p>

              </div>

            )}

        </div>

      </section>

    </div>

  )
}

export default Blog