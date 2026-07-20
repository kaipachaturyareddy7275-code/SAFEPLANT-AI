import { useEffect, useState } from "react";

function Alerts() {

    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        const loadAlerts = () => {

            fetch("http://127.0.0.1:5000/alerts")
                .then(res => res.json())
                .then(data => setAlerts(data));

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

                    {alerts.map((alert, index) => (

                        <tr key={index}>

                            <td>{alert.time}</td>

                            <td>{alert.level}</td>

                            <td>{alert.message}</td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Alerts;