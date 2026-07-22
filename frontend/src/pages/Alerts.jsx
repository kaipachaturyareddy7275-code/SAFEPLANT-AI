import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Alerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        const loadAlerts = () => {

            fetch(`${API_URL}/alerts`)
                .then(res => res.json())
                .then(data => setAlerts(data))
                .catch(err => console.error("Error loading alerts:", err));

        };

        loadAlerts();

        const timer = setInterval(loadAlerts, 2000);

        return () => clearInterval(timer);

    }, []);

    return (

        <div className="dashboard">

            <h1>Smart Alerts</h1>

            <table className="table">

                <thead>

                    <tr>
                        <th>Time</th>
                        <th>Severity</th>
                        <th>Message</th>
                    </tr>

                </thead>

                <tbody>

                    {alerts.length === 0 ? (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>
                                No alerts available
                            </td>
                        </tr>
                    ) : (
                        alerts.map((alert, index) => (
                            <tr key={index}>
                                <td>{alert.time}</td>
                                <td>{alert.level}</td>
                                <td>{alert.message}</td>
                            </tr>
                        ))
                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Alerts;