import "./../styles/sensorcard.css";

function SensorCard({ sensor }) {

    const status = sensor.gas > 70 ? "Danger" : "Safe";

    return (
        <div className="sensor-card">

            <h2>Zone {sensor.zone}</h2>

            <p>Gas : {sensor.gas}</p>

            <p>Temperature : {sensor.temp}°C</p>

            <p>Pressure : {sensor.pressure} PSI</p>

            <span
                className={
                    status === "Danger"
                        ? "danger"
                        : "safe"
                }
            >
                {status}
            </span>

        </div>
    );
}

export default SensorCard;