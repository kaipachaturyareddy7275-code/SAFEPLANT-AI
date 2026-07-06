import { useEffect, useState } from "react";
import "../styles/Risk.css";

function Risk() {
  const [risks, setRisks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/risk")
      .then((res) => res.json())
      .then((data) => setRisks(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="risk-container">
      <h1>⚠ AI Risk Detection Engine</h1>

      <div className="risk-grid">
        {risks.map((item, index) => (
          <div
            key={index}
            className={`risk-card ${
              item.risk === "HIGH"
                ? "high"
                : item.risk === "CRITICAL"
                ? "critical"
                : "low"
            }`}
          >
            <h2>Zone {item.zone}</h2>

            <p><strong>Permit:</strong> {item.permit}</p>

            <p><strong>Gas:</strong> {item.gas}</p>

            <p><strong>Temperature:</strong> {item.temperature} °C</p>

            <p><strong>Pressure:</strong> {item.pressure}</p>

            <h3>{item.risk}</h3>

            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${item.score}%` }}
              ></div>
            </div>

            <p>Risk Score : {item.score}%</p>

            <h4>Recommendation</h4>

            {item.risk === "HIGH" && (
              <ul>
                <li>Stop Hot Work</li>
                <li>Evacuate Workers</li>
                <li>Notify Safety Officer</li>
              </ul>
            )}

            {item.risk === "LOW" && (
              <ul>
                <li>Continue Monitoring</li>
                <li>Routine Inspection</li>
              </ul>
            )}

            {item.risk === "CRITICAL" && (
              <ul>
                <li>Emergency Shutdown</li>
                <li>Evacuate Entire Plant</li>
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Risk;