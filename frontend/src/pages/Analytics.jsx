import { useEffect, useState } from "react";

import RiskTrendChart from "../components/RiskTrendChart";
import WorkerChart from "../components/WorkerChart";
import AlertPieChart from "../components/AlertPieChart";
import RiskBarChart from "../components/RiskBarChart";

import "../styles/analytics.css";

const API_URL = import.meta.env.VITE_API_URL;

function Analytics() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadAnalytics = () => {

            fetch(`${API_URL}/analytics`)
                .then((res) => res.json())
                .then((analytics) => {

                    setData(analytics);
                    setLoading(false);

                })
                .catch((err) => {

                    console.error("Analytics Error:", err);
                    setLoading(false);

                });

        };

        // Initial Load
        loadAnalytics();

        // Auto Refresh Every 3 Seconds
        const timer = setInterval(loadAnalytics, 3000);

        return () => clearInterval(timer);

    }, []);

    if (loading) {

        return (

            <div className="analytics">

                <h1>Analytics Dashboard</h1>

                <h2>Loading...</h2>

            </div>

        );

    }

    return (

        <div className="analytics">

            <h1>Analytics Dashboard</h1>

            <div className="analytics-grid">

                <div className="chart-card">

                    <h2>Risk Trend</h2>

                    <RiskTrendChart data={data.risk} />

                </div>

                <div className="chart-card">

                    <h2>Worker Count</h2>

                    <WorkerChart data={data.workers} />

                </div>

                <div className="chart-card">

                    <h2>Alert Distribution</h2>

                    <AlertPieChart data={data.alerts} />

                </div>

                <div className="chart-card">

                    <h2>Risk Distribution</h2>

                    <RiskBarChart data={data.alerts} />

                </div>

            </div>

        </div>

    );

}

export default Analytics;