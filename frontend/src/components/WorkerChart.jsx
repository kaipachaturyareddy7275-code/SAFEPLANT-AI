import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function WorkerChart({ data }) {

    const chartData = data.map((workers, index) => ({
        time: index + 1,
        workers: workers
    }));

    return (

        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={chartData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="workers"
                    stroke="#2563EB"
                    strokeWidth={3}
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default WorkerChart;