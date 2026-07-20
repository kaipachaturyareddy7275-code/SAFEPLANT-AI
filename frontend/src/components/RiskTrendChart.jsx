import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function RiskTrendChart({ data }) {

    const chartData = data.map((risk, index) => ({
        time: index + 1,
        risk: risk
    }));

    return (

        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="risk"
                    stroke="#EF4444"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default RiskTrendChart;