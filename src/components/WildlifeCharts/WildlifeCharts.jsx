import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts"

function WildlifeCharts({ animals = [] }) {
    const chartData = [
        {
            name: "Critically Endangered",
            count: animals.filter(
                (animal) => animal.status === "Critically Endangered"
            ).length,
        },
        {
            name: "Endangered",
            count: animals.filter(
                (animal) => animal.status === "Endangered"
            ).length,
        },
        {
            name: "Vulnerable",
            count: animals.filter(
                (animal) => animal.status === "Vulnerable"
            ).length,
        },
        {
            name: "Near Threatened",
            count: animals.filter(
                (animal) => animal.status === "Near Threatened"
            ).length,
        },
        {
            name: "Least Concern",
            count: animals.filter(
                (animal) => animal.status === "Least Concern"
            ).length,
        },
    ]

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-6">

                {/* Heading */}
                <div className="text-center mb-10">

                    <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
                        Wildlife Data
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-green-950">
                        Conservation Status
                    </h2>

                    <p className="mt-4 text-gray-600">
                        Explore the distribution of species by their current
                        conservation status.
                    </p>

                </div>


                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Bar Chart */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">

                        <h3 className="text-xl font-bold text-green-950 mb-6">
                            Species by Status
                        </h3>

                        <div className="h-80">

                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>

                                    <CartesianGrid strokeDasharray="3 3" />

                                    <XAxis
                                        dataKey="name"
                                        angle={-15}
                                        textAnchor="end"
                                        height={70}
                                        interval={0}
                                        fontSize={12}
                                    />

                                    <YAxis allowDecimals={false} />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="count"
                                        name="Number of Species"
                                        fill="#2D6A4F"
                                    />

                                </BarChart>
                            </ResponsiveContainer>

                        </div>
                    </div>


                    {/* Pie Chart */}
                    <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">

                        <h3 className="text-xl font-bold text-green-950 mb-6">
                            Status Distribution
                        </h3>

                        <div className="h-80">

                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>

                                    <Pie
                                        data={chartData}
                                        dataKey="count"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        label
                                    >

                                        {chartData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    [
                                                        "#991B1B",
                                                        "#DC2626",
                                                        "#F59E0B",
                                                        "#CA8A04",
                                                        "#16A34A",
                                                    ][index]
                                                }
                                            />
                                        ))}

                                    </Pie>

                                    <Tooltip />

                                    <Legend />

                                </PieChart>
                            </ResponsiveContainer>

                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default WildlifeCharts