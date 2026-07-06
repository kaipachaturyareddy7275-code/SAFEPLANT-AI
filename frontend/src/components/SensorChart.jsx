import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function SensorChart() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sensors")
      .then((res) => res.json())
      .then((data) => setSensorData(data));
  }, []);

  const data = {
    labels: sensorData.map((item) => item.zone),

    datasets: [
      {
        label: "Gas",
        data: sensorData.map((item) => item.gas),
      },
      {
        label: "Temperature",
        data: sensorData.map((item) => item.temp),
      },
      {
        label: "Pressure",
        data: sensorData.map((item) => item.pressure),
      },
    ],
  };

  return (
    <div style={{ background: "white", padding: 20, borderRadius: 12 }}>
      <Line data={data} />
    </div>
  );
}

export default SensorChart;