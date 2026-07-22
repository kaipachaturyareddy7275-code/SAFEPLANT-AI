import { useEffect, useState } from "react";
import "../styles/Risk.css";

const API_URL = import.meta.env.VITE_API_URL;

function Risk() {

    const [risks, setRisks] = useState([]);

    useEffect(() => {

        const loadRisks = () => {

            fetch(`${API_URL}/risk`)
                .then((res) => res.json())
                .then((data) => {

                    // If backend returns a single object instead of an array
                    if (Array.isArray(data)) {
                        setRisks(data);
                    } else {
                        setRisks([data]);
                    }

                })
                .catch((err) => console.error("Risk API Error:", err));

        };

        loadRisks();

        const timer = setInterval(loadRisks, 3000);

        return () => clearInterval(timer);

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

                        <h2>Zone {item.zone ?? "-"}</h2>

                        <p><strong>Permit:</strong> {item.permit ?? "-"}</p>

                        <p><strong>Gas:</strong> {item.gas ?? "-"}</p>

                        <p><strong>Temperature:</strong> {item.temperature ?? "-"} °C</p>

                        <p><strong>Pressure:</strong> {item.pressure ?? "-"}</p>

                        <h3>{item.risk ?? item.status}</h3>

                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{
                                    width: `${item.score ?? item.risk_score ?? 0}%`
                                }}
                            ></div>

                        </div>

                        <p>
                            Risk Score :
                            {" "}
                            {item.score ?? item.risk_score ?? 0}%
                        </p>

                        <h4>Recommendation</h4>

                        {(item.risk === "HIGH" || item.status === "HIGH") && (

                            <ul>
                                <li>Stop Hot Work</li>
                                <li>Evacuate Workers</li>
                                <li>Notify Safety Officer</li>
                            </ul>

                        )}

                        {(item.risk === "LOW" || item.status === "LOW") && (

                            <ul>
                                <li>Continue Monitoring</li>
                                <li>Routine Inspection</li>
                            </ul>

                        )}

                        {(item.risk === "CRITICAL" || item.status === "CRITICAL") && (

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