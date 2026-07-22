import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Sensors() {

    const [sensor, setSensor] = useState(null);

    useEffect(() => {

        const loadData = () => {

            fetch(`${API_URL}/sensors`)
                .then(res => {

                    if (!res.ok) {
                        throw new Error("Failed to load sensor data");
                    }

                    return res.json();

                })
                .then(data => setSensor(data))
                .catch(err => console.error("Sensor API Error:", err));

        };

        loadData();

        const timer = setInterval(loadData, 2000);

        return () => clearInterval(timer);

    }, []);

    if (!sensor) {

        return (

            <div className="dashboard">
                <h2>Loading Sensors...</h2>
            </div>

        );

    }

    return (

        <div className="dashboard">

            <h1>Industrial Sensors</h1>

            <div className="top-cards">

                <div className="card">
                    🌡 Temperature
                    <h2>{sensor.temperature} °C</h2>
                </div>

                <div className="card">
                    💨 Gas
                    <h2>{sensor.gas} ppm</h2>
                </div>

                <div className="card">
                    💧 Humidity
                    <h2>{sensor.humidity}%</h2>
                </div>

                <div className="card">
                    ⚙ Pressure
                    <h2>{sensor.pressure} hPa</h2>
                </div>

                <div className="card">
                    🔥 Smoke
                    <h2>{sensor.smoke}</h2>
                </div>

            </div>

        </div>

    );

}

export default Sensors;