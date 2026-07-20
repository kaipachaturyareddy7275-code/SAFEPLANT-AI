import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#EF4444",
    "#F59E0B",
    "#22C55E"
];

function AlertPieChart({ data }) {

    const chartData = [
        {
            name: "HIGH",
            value: data.HIGH
        },
        {
            name: "MEDIUM",
            value: data.MEDIUM
        },
        {
            name: "LOW",
            value: data.LOW
        }
    ];

    return (

        <ResponsiveContainer width="100%" height={300}>

            <PieChart>

                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={100}
                    label
                >

                    {chartData.map((entry, index) => (

                        <Cell
                            key={index}
                            fill={COLORS[index]}
                        />

                    ))}

                </Pie>

                <Tooltip />

                <Legend />

            </PieChart>

        </ResponsiveContainer>

    );

}

export default AlertPieChart;