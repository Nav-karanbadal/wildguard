import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa6"

// Load all local wildlife images
const imageFiles = import.meta.glob(
  "../../assets/images/*.jpg",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
)

// Convert animal name into the same format as our image filename
function createImageName(animalName) {
  return (
    String(animalName || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") + ".jpg"
  )
}

// Create filename → image URL map
const animalImages = Object.entries(imageFiles).reduce(
  (images, [path, image]) => {
    const fileName = path.split("/").pop()

    images[fileName] = image

    return images
  },
  {}
)

// Local fallback image
const fallbackImage = animalImages["african-elephant.jpg"]


function WildlifeCard({ animal }) {

  const imageName = createImageName(animal.name)

  const image =
    animalImages[imageName] || fallbackImage


  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition duration-300">

      {/* Image */}
      <div className="relative h-64 overflow-hidden">

        <img
          src={image}
          alt={animal.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Status */}
        <div className="absolute top-4 left-4">

          <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            {animal.status}
          </span>

        </div>

      </div>


      {/* Content */}
      <div className="p-6">

        <h3 className="text-xl font-bold text-green-950">
          {animal.name}
        </h3>

        <p className="text-sm italic text-gray-500 mt-1">
          {animal.scientificName}
        </p>

        <p className="text-gray-600 text-sm leading-6 mt-4">
          {animal.description}
        </p>


        <Link
          to={`/wildlife/${animal.id}`}
          className="inline-flex items-center gap-2 mt-5 text-green-700 font-semibold text-sm hover:text-green-900 transition"
        >
          Learn More
          <FaArrowRight className="text-xs" />
        </Link>

      </div>

    </div>
  )
}


export default WildlifeCard