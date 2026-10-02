import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts"

function ProgramCharts({ programs }) {
    const chartData = programs.map((program) => ({
        name: program.title,
        category: program.category,
        count: 1,
    }))

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-10">
                    <p className="text-green-700 font-semibold uppercase tracking-widest text-sm mb-3">
                        Program Data
                    </p>

                    <h2 className="text-3xl md:text-4xl font-bold text-green-950">
                        Programs by Initiative
                    </h2>

                    <p className="mt-4 text-gray-600">
                        A visual overview of the programs currently included
                        in our conservation database.
                    </p>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">

                    <div className="h-96">

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis
                                    dataKey="name"
                                    tick={{ fontSize: 12 }}
                                />

                                <YAxis
                                    allowDecimals={false}
                                />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    name="Programs"
                                    fill="#2D6A4F"
                                />

                            </BarChart>
                        </ResponsiveContainer>

                    </div>

                </div>

            </div>
        </section>
    )
}

export default ProgramCharts