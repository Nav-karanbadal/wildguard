import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  FaPaw,
  FaTree,
  FaWater,
  FaSeedling,
  FaArrowLeft,
} from "react-icons/fa6"
import { getPrograms } from "../redux/programSlice"

function ProgramDetails() {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { programs, loading, error } = useSelector(
    (state) => state.programs
  )

  useEffect(() => {
    if (programs.length === 0) {
      dispatch(getPrograms())
    }
  }, [dispatch, programs.length])

  const program = programs.find(
    (item) => String(item.ID) === String(id)
  )

  const getProgramIcon = () => {
    if (!program) return <FaPaw />

    const index = programs.findIndex(
      (item) => String(item.ID) === String(program.ID)
    )

    if (index % 4 === 0) return <FaPaw />
    if (index % 4 === 1) return <FaTree />
    if (index % 4 === 2) return <FaWater />

    return <FaSeedling />
  }

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-green-700 font-semibold">
            Loading program details...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-green-950">
            Unable to Load Program
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <Link
            to="/programs"
            className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Back to Programs
          </Link>
        </div>
      </section>
    )
  }

  if (!program) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold text-green-950">
            Program Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            The conservation program you are looking for does not exist.
          </p>

          <Link
            to="/programs"
            className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
          >
            Back to Programs
          </Link>
        </div>
      </section>
    )
  }

  return (
    <div>

      {/* Header */}
      <section className="bg-green-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">

          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-green-300 hover:text-white transition mb-8"
          >
            <FaArrowLeft />
            Back to Programs
          </Link>

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-green-700 flex items-center justify-center text-3xl">
              {getProgramIcon()}
            </div>

            <div>
              <p className="text-green-300 font-semibold">
                {program["Current Status"]}
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mt-2">
                {program["Program Name"]}
              </h1>
            </div>

          </div>

        </div>
      </section>


      {/* Details */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100">

              <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
                About the Program
              </p>

              <h2 className="text-3xl font-bold text-green-950">
                {program["Program Name"]}
              </h2>

              <p className="mt-5 text-gray-600 leading-8">
                {program.Description}
              </p>

              <h3 className="text-xl font-bold text-green-950 mt-8">
                Objectives and Goals
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {program["Objectives and Goals"]}
              </p>

              <h3 className="text-xl font-bold text-green-950 mt-8">
                Target Species / Ecosystems
              </h3>

              <p className="mt-3 text-gray-600 leading-7">
                {program["Target Species/Ecosystems"]}
              </p>

            </div>


            {/* Information Card */}
            <div className="bg-green-900 text-white rounded-2xl p-8 h-fit">

              <h3 className="text-xl font-bold mb-6">
                Program Information
              </h3>

              <div className="space-y-5">

                <div>
                  <p className="text-green-300 text-sm">
                    Government Agency
                  </p>

                  <p className="font-semibold mt-1">
                    {program["Government Agency"]}
                  </p>
                </div>

                <div>
                  <p className="text-green-300 text-sm">
                    Country / Region
                  </p>

                  <p className="font-semibold mt-1">
                    {program["Country/Region"]}
                  </p>
                </div>

                <div>
                  <p className="text-green-300 text-sm">
                    Year Launched
                  </p>

                  <p className="font-semibold mt-1">
                    {program["Year Launched"]}
                  </p>
                </div>

                <div>
                  <p className="text-green-300 text-sm">
                    Current Status
                  </p>

                  <p className="font-semibold mt-1">
                    {program["Current Status"]}
                  </p>
                </div>

                <div>
                  <p className="text-green-300 text-sm">
                    Duration
                  </p>

                  <p className="font-semibold mt-1">
                    {program.Duration}
                  </p>
                </div>

                <div>
                  <p className="text-green-300 text-sm">
                    Funding
                  </p>

                  <p className="font-semibold mt-1">
                    {program["Funding (USD)"]}
                  </p>
                </div>

              </div>

              <Link
                to="/join"
                className="block text-center mt-8 bg-white text-green-900 px-5 py-3 rounded-full font-semibold hover:bg-green-100 transition"
              >
                Get Involved
              </Link>

            </div>

          </div>

        </div>
      </section>

    </div>
  )
}

export default ProgramDetails