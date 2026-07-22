import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const API_URL = import.meta.env.VITE_API_URL;

function SensorChart() {

    const [data, setData] = useState([]);

    useEffect(() => {

        const updateChart = () => {

            fetch(`${API_URL}/sensors`)
                .then(res => res.json())
                .then(sensor => {

                    setData(prev => [

                        ...prev.slice(-9),

                        {
                            time: new Date().toLocaleTimeString(),
                            temperature: sensor.temperature
                        }

                    ]);

                })
                .catch(err => console.error(err));

        };

        updateChart();

        const timer = setInterval(updateChart, 2000);

        return () => clearInterval(timer);

    }, []);

    return (

        <ResponsiveContainer width="100%" height={300}>

            <LineChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="temperature"
                    stroke="#2563EB"
                />

            </LineChart>

        </ResponsiveContainer>

    );

}

export default SensorChart;