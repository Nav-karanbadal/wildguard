import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { FaArrowLeft, FaPaw } from "react-icons/fa6"
import { useDispatch, useSelector } from "react-redux"

import { getWildlife } from "../redux/wildlifeSlice"

// Load all local wildlife images
const imageFiles = import.meta.glob(
    "../assets/images/*.jpg",
    {
        eager: true,
        query: "?url",
        import: "default",
    }
)

// Convert animal name into the matching image filename
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

// Fallback image
const fallbackImage = animalImages["african-elephant.jpg"]

function WildlifeDetails() {
    const { id } = useParams()

    const dispatch = useDispatch()

    const {
        animals,
        loading,
        error,
    } = useSelector((state) => state.wildlife)

    useEffect(() => {
        if (animals.length === 0) {
            dispatch(getWildlife())
        }
    }, [dispatch, animals.length])

    const animal = animals.find(
        (item) => String(item.ID) === String(id)
    )

    // Find the correct local image using the animal name
    const imageName = animal
        ? createImageName(animal["Animal Name"])
        : ""

    const animalImage =
        animalImages[imageName] || fallbackImage

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <p className="text-lg font-semibold text-green-700">
                    Loading wildlife details...
                </p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <h2 className="text-2xl font-bold text-red-600">
                    Unable to load wildlife details
                </h2>

                <p className="text-gray-500 mt-2">
                    {error}
                </p>

                <Link
                    to="/wildlife"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition"
                >
                    <FaArrowLeft />
                    Back to Wildlife
                </Link>
            </div>
        )
    }

    if (!animal) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
                <FaPaw className="text-5xl text-green-700 mb-5" />

                <h2 className="text-2xl font-bold text-green-950">
                    Wildlife Not Found
                </h2>

                <p className="text-gray-500 mt-2">
                    The requested wildlife species could not be found.
                </p>

                <Link
                    to="/wildlife"
                    className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-green-700 text-white font-semibold hover:bg-green-800 transition"
                >
                    <FaArrowLeft />
                    Back to Wildlife
                </Link>
            </div>
        )
    }

    return (
        <div>

            {/* Hero */}
            <section className="relative bg-green-950 text-white overflow-hidden">

                <div className="absolute inset-0">
                    <img
                        src={animalImage}
                        alt={animal["Animal Name"]}
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>

                <div className="absolute inset-0 bg-green-950/70" />

                <div className="relative max-w-7xl mx-auto px-6 py-24">

                    <Link
                        to="/wildlife"
                        className="inline-flex items-center gap-2 text-green-200 hover:text-white transition mb-8"
                    >
                        <FaArrowLeft />
                        Back to Wildlife
                    </Link>

                    <div className="max-w-3xl">

                        <span className="inline-block px-4 py-2 rounded-full bg-red-600 text-white text-sm font-semibold">
                            {animal["Conservation Status"]}
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold mt-6">
                            {animal["Animal Name"]}
                        </h1>

                        <p className="text-xl md:text-2xl italic text-green-200 mt-3">
                            {animal.Species}
                        </p>

                        <p className="mt-6 text-lg text-green-100 leading-8">
                            Learn more about this species, its habitat, diet,
                            physical characteristics and conservation status.
                        </p>

                    </div>

                </div>
            </section>


            {/* Details */}
            <section className="py-16 bg-white">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Main Information */}
                        <div className="lg:col-span-2">

                            <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
                                Species Information
                            </p>

                            <h2 className="text-3xl md:text-4xl font-bold text-green-950">
                                About {animal["Animal Name"]}
                            </h2>

                            <p className="mt-5 text-gray-600 leading-8">
                                {animal["Animal Name"]} is a species associated with{" "}
                                {animal.Habitat} habitats. It has a{" "}
                                {animal.Diet.toLowerCase()} diet and is currently
                                classified as {animal["Conservation Status"]}.
                            </p>

                            <p className="mt-5 text-gray-600 leading-8">
                                Understanding the characteristics and habitat
                                requirements of wildlife species helps us appreciate
                                their role in maintaining healthy ecosystems and
                                highlights the importance of conservation efforts.
                            </p>

                        </div>


                        {/* Status Card */}
                        <div className="bg-gray-50 rounded-2xl p-7 border border-gray-100">

                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                Conservation Status
                            </p>

                            <p className="text-2xl font-bold text-green-700 mt-3">
                                {animal["Conservation Status"]}
                            </p>

                            <div className="mt-6 h-px bg-gray-200" />

                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-6">
                                Habitat
                            </p>

                            <p className="text-lg font-semibold text-green-950 mt-2">
                                {animal.Habitat}
                            </p>

                            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mt-6">
                                Diet
                            </p>

                            <p className="text-lg font-semibold text-green-950 mt-2">
                                {animal.Diet}
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* Wildlife Facts */}
            <section className="py-16 bg-gray-50">

                <div className="max-w-7xl mx-auto px-6">

                    <div className="text-center mb-10">

                        <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
                            Wildlife Facts
                        </p>

                        <h2 className="text-3xl md:text-4xl font-bold text-green-950">
                            Species at a Glance
                        </h2>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                        <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Average Lifespan
                            </p>

                            <p className="text-3xl font-bold text-green-700 mt-3">
                                {animal["Average Lifespan (Years)"]}
                            </p>

                            <p className="text-gray-500 mt-1">
                                years
                            </p>

                        </div>


                        <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Weight
                            </p>

                            <p className="text-3xl font-bold text-green-700 mt-3">
                                {animal["Weight (kg)"]}
                            </p>

                            <p className="text-gray-500 mt-1">
                                kg
                            </p>

                        </div>


                        <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Height
                            </p>

                            <p className="text-3xl font-bold text-green-700 mt-3">
                                {animal["Height (cm)"]}
                            </p>

                            <p className="text-gray-500 mt-1">
                                cm
                            </p>

                        </div>


                        <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Speed
                            </p>

                            <p className="text-3xl font-bold text-green-700 mt-3">
                                {animal["Speed (km/h)"]}
                            </p>

                            <p className="text-gray-500 mt-1">
                                km/h
                            </p>

                        </div>


                        <div className="bg-white rounded-2xl p-7 text-center border border-gray-100 shadow-sm">

                            <p className="text-sm text-gray-500">
                                Habitat
                            </p>

                            <p className="text-xl font-bold text-green-700 mt-4">
                                {animal.Habitat}
                            </p>

                        </div>

                    </div>

                </div>
            </section>


            {/* CTA */}
            <section className="py-16 bg-green-950 text-white">

                <div className="max-w-4xl mx-auto px-6 text-center">

                    <h2 className="text-3xl md:text-4xl font-bold">
                        Help Protect Wildlife
                    </h2>

                    <p className="mt-4 text-green-100 leading-7">
                        Learn more about how you can contribute to wildlife
                        conservation and become part of our mission.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">

                        <Link
                            to="/join"
                            className="px-6 py-3 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-500 transition"
                        >
                            Join Our Team
                        </Link>

                        <Link
                            to="/wildlife"
                            className="px-6 py-3 rounded-lg border border-green-400 text-green-100 font-semibold hover:bg-green-900 transition"
                        >
                            Explore More Wildlife
                        </Link>

                    </div>

                </div>
            </section>

        </div>
    )
}

export default WildlifeDetails