import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RiskBarChart({ data }) {

    const chartData = [
        {
            level: "HIGH",
            value: data.HIGH
        },
        {
            level: "MEDIUM",
            value: data.MEDIUM
        },
        {
            level: "LOW",
            value: data.LOW
        }
    ];

    return (

        <ResponsiveContainer width="100%" height={300}>

            <BarChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="level" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="value"
                    fill="#2563EB"
                />

            </BarChart>

        </ResponsiveContainer>

    );

}

export default RiskBarChart;