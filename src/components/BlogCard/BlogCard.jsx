import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"

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

function BlogCard({ blog }) {
  // API ID decides which local image to use
  const imageName = `blog-${blog.id}.jpg`

  const image =
    blogImages[imageName] || fallbackImage

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">

      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={image}
          alt={blog.title}
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
        <h3 className="text-xl font-bold text-green-950 mt-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-7 mt-3">
          {blog.description}
        </p>

        {/* Read Story */}
        <Link
          to={`/blog/${blog.id}`}
          className="inline-flex items-center gap-2 mt-5 text-green-700 font-semibold hover:text-green-900 transition"
        >
          Read Story
          <FaArrowRight className="text-sm" />
        </Link>

      </div>

    </article>
  )
}

export default BlogCard