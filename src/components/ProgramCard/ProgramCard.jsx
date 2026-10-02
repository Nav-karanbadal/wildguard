import { Link } from "react-router-dom"

function ProgramCard({ program }) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300">

            {/* Icon */}
            <div className="p-7 pb-0">
                <div className="w-14 h-14 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-2xl group-hover:bg-green-700 group-hover:text-white transition">
                    {program.icon}
                </div>
            </div>

            {/* Content */}
            <div className="p-7">

                {/* Status */}
                <p className="text-sm font-semibold text-green-700">
                    {program.status}
                </p>

                {/* Program Name */}
                <h3 className="text-xl font-bold text-green-950 mt-2">
                    {program.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-7 mt-3">
                    {program.description}
                </p>

                {/* Program Information */}
                <div className="mt-5 space-y-2 text-sm">

                    <p className="text-gray-500">
                        <span className="font-semibold text-gray-700">
                            Location:
                        </span>{" "}
                        {program.country}
                    </p>

                    <p className="text-gray-500">
                        <span className="font-semibold text-gray-700">
                            Launched:
                        </span>{" "}
                        {program.yearLaunched}
                    </p>

                </div>

                {/* View Program */}
                <Link
                    to={`/programs/${program.id}`}
                    className="inline-flex items-center mt-5 text-green-700 font-semibold hover:text-green-900 transition"
                >
                    View Program →
                </Link>

            </div>
        </div>
    )
}

export default ProgramCard