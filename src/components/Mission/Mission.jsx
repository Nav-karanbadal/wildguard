import {
  FaLeaf,
  FaHeart,
  FaUsers,
  FaPaw,
} from "react-icons/fa6"

function Mission() {
  const missions = [
    {
      icon: FaLeaf,
      title: "Conserve Habitats",
      description:
        "Protect forests, rivers and oceans for future generations.",
    },
    {
      icon: FaHeart,
      title: "Protect Endangered Species",
      description:
        "Help threatened species survive and thrive.",
    },
    {
      icon: FaUsers,
      title: "Create Awareness",
      description:
        "Educate and inspire communities to protect nature.",
    },
    {
      icon: FaPaw,
      title: "Take Action",
      description:
        "Volunteer, support conservation and be a voice for change.",
    },
  ]

  return (
    <section className="bg-white py-20">

      <div className="max-w-7xl mx-auto px-6">

        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">

          <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
            Our Mission
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-green-950">
            Protecting Nature Starts With Us
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            Every species plays an important role in our ecosystem.
            Together, we can protect wildlife and create a sustainable
            future for generations to come.
          </p>

        </div>

        {/* Mission Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {missions.map((mission, index) => {

            const Icon = mission.icon

            return (
              <div
                key={index}
                className="group text-center p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition duration-300"
              >

                {/* Icon */}
                <div className="mx-auto w-16 h-16 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-700 transition duration-300">

                  <Icon className="text-2xl text-green-700 group-hover:text-white transition duration-300" />

                </div>

                {/* Title */}
                <h3 className="mt-6 text-xl font-semibold text-green-950">
                  {mission.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-gray-600 leading-6 text-sm">
                  {mission.description}
                </p>

              </div>
            )
          })}

        </div>

      </div>

    </section>
  )
}

export default Mission