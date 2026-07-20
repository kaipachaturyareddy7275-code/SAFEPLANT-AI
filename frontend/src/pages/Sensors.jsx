import { useEffect, useState } from "react";

function Sensors() {

    const [sensor, setSensor] = useState(null);

    useEffect(() => {

        const loadData = () => {

            fetch("http://127.0.0.1:5000/sensors")
                .then(res => res.json())
                .then(data => setSensor(data));

        };

        loadData();

        const timer = setInterval(loadData, 2000);

        return () => clearInterval(timer);

    }, []);

    if (!sensor)
        return <h2>Loading Sensors...</h2>;

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