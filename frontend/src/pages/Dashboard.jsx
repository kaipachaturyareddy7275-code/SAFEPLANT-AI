import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";
import SensorChart from "../components/SensorChart";
import LiveCamera from "../components/LiveCamera";
import NotificationPanel from "../components/NotificationPanel";

import {
    FaUsers,
    FaClipboardList,
    FaBell,
    FaExclamationTriangle,
} from "react-icons/fa";

import "../styles/dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {

    const [data, setData] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadDashboard = () => {

            fetch(`${API_URL}/risk`)
                .then((res) => {

                    if (!res.ok) {
                        throw new Error("Unable to connect to backend.");
                    }

                    return res.json();

                })
                .then((dashboard) => {

                    setData(dashboard);
                    setError("");

                })
                .catch((err) => {

                    console.error(err);
                    setError("❌ Backend is not running.");

                });

        };

        loadDashboard();

        const timer = setInterval(loadDashboard, 3000);

        return () => clearInterval(timer);

    }, []);

    if (error) {

        return (

            <div className="dashboard">

                <h2 style={{ color: "red" }}>{error}</h2>

            </div>

        );

    }

    if (!data) {

        return (

            <div className="dashboard">

                <h2>Loading Dashboard...</h2>

            </div>

        );

    }

    return (

        <div className="dashboard">

            {/* Dashboard Cards */}

            <div className="top-cards">

                <DashboardCard
                    title="Active Workers"
                    value={data.active_workers}
                    icon={<FaUsers />}
                    color="#2563EB"
                />

                <DashboardCard
                    title="Active Permits"
                    value={data.active_permits}
                    icon={<FaClipboardList />}
                    color="#16A34A"
                />

                <DashboardCard
                    title="Active Alerts"
                    value={data.active_alerts}
                    icon={<FaBell />}
                    color="#EA580C"
                />

                <DashboardCard
                    title="Overall Risk"
                    value={data.overall_risk}
                    icon={<FaExclamationTriangle />}
                    color="#DC2626"
                />

                <DashboardCard
                    title="Risk Score"
                    value={`${data.risk_score}%`}
                    icon={<FaExclamationTriangle />}
                    color="#B91C1C"
                />

            </div>

            {/* Live Camera */}

            <div style={{ marginTop: "30px" }}>

                <LiveCamera />

            </div>

            {/* Sensor Analytics */}

            <div style={{ marginTop: "30px" }}>

                <h2>📊 Sensor Analytics</h2>

                <SensorChart />

            </div>

            {/* Notifications */}

            <div style={{ marginTop: "30px" }}>

                <NotificationPanel />

            </div>

            {/* Bottom Section */}

            <div className="bottom">

                <div className="alerts">

                    <h2>🚨 Recent Alerts</h2>

                    <ul>

                        <li>🚨 Gas Leak detected in Zone B</li>
                        <li>⚠ High Temperature in Zone A</li>
                        <li>✔ Permit Approved in Zone C</li>

                    </ul>

                </div>

                <div className="status">

                    <h2>Plant Status</h2>

                    <h1
                        style={{
                            color:
                                data.overall_risk === "HIGH"
                                    ? "red"
                                    : data.overall_risk === "MEDIUM"
                                    ? "orange"
                                    : "green",
                        }}
                    >

                        {data.overall_risk === "HIGH"
                            ? "🔴 HIGH RISK"
                            : data.overall_risk === "MEDIUM"
                                ? "🟠 MEDIUM RISK"
                                : "🟢 SAFE"}

                    </h1>

                    <p>AI Monitoring System Running Successfully.</p>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;