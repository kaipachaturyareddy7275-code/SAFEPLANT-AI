import { useEffect, useState } from "react";
import SensorCard from "../components/SensorCard";
import "../styles/dashboard.css";

function Sensors() {
  const [sensors, setSensors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/sensors")
      .then((res) => res.json())
      .then((data) => setSensors(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredSensors = sensors.filter((sensor) =>
    sensor.zone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <h1 className="page-title">Live Sensors Monitoring</h1>

      <input
        type="text"
        placeholder="Search by Zone..."
        className="search-box"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="cards-grid">
        {filteredSensors.map((sensor, index) => (
          <SensorCard key={index} sensor={sensor} />
        ))}
      </div>
    </div>
  );
}

export default Sensors;