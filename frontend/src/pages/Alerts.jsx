import { useEffect, useState } from "react";
import "../styles/Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/alerts")
      .then((res) => res.json())
      .then((data) => setAlerts(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="alerts-container">
      <h1>🚨 Live Safety Alerts</h1>

      <div className="alerts-grid">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`alert-card ${alert.level.toLowerCase()}`}
          >
            <h2>{alert.level}</h2>

            <p><strong>Zone:</strong> {alert.zone}</p>

            <p>{alert.message}</p>

            <p><strong>Time:</strong> {alert.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Alerts;