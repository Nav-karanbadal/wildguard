import {
  FaPaw,
  FaUsers,
  FaLeaf,
  FaTree,
} from "react-icons/fa6"

function Impact() {
  const statistics = [
    {
      icon: FaPaw,
      number: "500+",
      label: "Species Protected",
    },
    {
      icon: FaUsers,
      number: "20,000+",
      label: "Volunteers",
    },
    {
      icon: FaLeaf,
      number: "100+",
      label: "Conservation Programs",
    },
    {
      icon: FaTree,
      number: "50+",
      label: "Protected Areas",
    },
  ]

  return (
    <section className="bg-green-950 py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">

          <p className="text-green-300 font-semibold uppercase tracking-widest text-sm mb-3">
            Our Impact
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Together, We Can Make a Difference
          </h2>

          <p className="mt-4 text-green-100/70 max-w-2xl mx-auto">
            Every action matters. From protecting endangered species
            to restoring natural habitats, collective efforts create
            lasting change.
          </p>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

          {statistics.map((stat, index) => {

            const Icon = stat.icon

            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition duration-300"
              >

                {/* Icon */}
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                  <Icon className="text-2xl text-green-300" />
                </div>

                {/* Number */}
                <h3 className="mt-5 text-3xl md:text-4xl font-bold text-white">
                  {stat.number}
                </h3>

                {/* Label */}
                <p className="mt-2 text-green-100/70 text-sm">
                  {stat.label}
                </p>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default Impact