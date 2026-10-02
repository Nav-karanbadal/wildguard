import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"

import { getBlogs } from "../../redux/blogSlice"

// Load all local blog images
const imageFiles = import.meta.glob(
  "../../assets/images/blogs/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)

// Create filename → image URL map
const blogImages = Object.entries(imageFiles).reduce(
  (images, [path, image]) => {
    const fileName = path.split("/").pop()

    images[fileName] = image

    return images
  },
  {}
)

// Fallback image
const fallbackImage = blogImages["blog-1.jpg"]

function BlogPreview() {
  const dispatch = useDispatch()

  const {
    blogs,
    loading,
    error,
  } = useSelector((state) => state.blogs)

  const [cardsPerView, setCardsPerView] = useState(3)
  const [currentGroup, setCurrentGroup] = useState(0)

  // Fetch blogs
  useEffect(() => {
    if (blogs.length === 0) {
      dispatch(getBlogs())
    }
  }, [dispatch, blogs.length])

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
    Every blog becomes a starting point.

    Example on tablet:

    1,2
    2,3
    3,4
    ...
    14,15
    15,1
  */
  const totalGroups = blogs.length

  // Automatically change blogs every 8 seconds
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

  // Create circular list of visible blogs
  const visibleBlogs = Array.from({
    length: Math.min(
      cardsPerView,
      blogs.length
    ),
  }).map((_, index) => {

    const blogIndex =
      (currentGroup + index) % blogs.length

    const blog = blogs[blogIndex]

    const imageName = `blog-${blog.ID}.jpg`

    return {
      id: blog.ID,
      title: blog["Blog Title"],
      description: blog.Description,
      category: blog["Focus Area"],
      image: blogImages[imageName] || fallbackImage,
    }
  })

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">

          <span className="text-green-700 font-semibold uppercase tracking-wide text-sm">
            From Our Blog
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-green-950 mt-3">
            Stories That Inspire Conservation
          </h2>

          <p className="text-gray-600 leading-7 mt-4">
            Discover stories, insights, and updates about wildlife
            conservation and protecting our natural world.
          </p>

        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500 mt-10">
            Loading stories...
          </p>
        )}

        {/* Error */}
        {!loading && error && (
          <p className="text-center text-red-600 mt-10">
            Unable to load stories.
          </p>
        )}

        {/* Blog Cards */}
        {!loading &&
          !error &&
          visibleBlogs.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">

              {visibleBlogs.map((blog, index) => (

                <article
                  key={`${blog.id}-${currentGroup}-${index}`}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >

                  {/* Image */}
                  <div className="relative h-60 overflow-hidden">

                    <img
                      src={blog.image}
                      alt={blog.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />

                  </div>

                  {/* Content */}
                  <div className="p-6">

                    {/* Category */}
                    <span className="text-sm font-semibold text-green-700">
                      {blog.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-green-950 mt-2 line-clamp-2 min-h-[56px]">
                      {blog.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-7 mt-3 line-clamp-4">
                      {blog.description}
                    </p>

                    {/* Read Story */}
                    <Link
                      to={`/blog/${blog.id}`}
                      className="inline-flex items-center gap-2 mt-5 text-green-700 font-semibold hover:text-green-900 transition"
                    >
                      Read Story

                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition" />
                    </Link>

                  </div>

                </article>

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
                  aria-label={`Show blog group ${index + 1}`}
                />

              ))}

            </div>

          )}

        {/* Explore All Stories */}
        {!loading &&
          !error &&
          blogs.length > 0 && (

            <div className="flex justify-center mt-10">

              <Link
                to="/blog"
                className="group inline-flex items-center gap-3 border-2 border-green-700 text-green-700 px-7 py-3.5 rounded-full font-semibold hover:bg-green-700 hover:text-white transition-all duration-300"
              >

                <span>
                  Explore All Stories
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

export default BlogPreview