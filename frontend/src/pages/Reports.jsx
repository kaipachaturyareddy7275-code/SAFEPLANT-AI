import { useEffect, useMemo, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function Reports() {

    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {

        const loadReports = () => {

            fetch(`${API_URL}/reports`)
                .then(res => res.json())
                .then(data => setReports(data))
                .catch(err => console.error("Error loading reports:", err));

        };

        loadReports();

        const timer = setInterval(loadReports, 3000);

        return () => clearInterval(timer);

    }, []);

    const filteredReports = useMemo(() => {

        return reports.filter(report => {

            const matchesSearch =
                report.source.toLowerCase().includes(search.toLowerCase()) ||
                report.status.toLowerCase().includes(search.toLowerCase());

            const matchesFilter =
                filter === "ALL" || report.status === filter;

            return matchesSearch && matchesFilter;

        });

    }, [reports, search, filter]);

    return (

        <div className="dashboard">

            <h1>Incident Reports</h1>

            {/* Summary Cards */}

            <div className="top-cards">

                <div className="card">
                    <h2>{reports.length}</h2>
                    <p>Total Incidents</p>
                </div>

                <div className="card">
                    <h2>{reports.filter(r => r.status === "HIGH").length}</h2>
                    <p>High Risk</p>
                </div>

                <div className="card">
                    <h2>{reports.filter(r => r.status === "MEDIUM").length}</h2>
                    <p>Medium Risk</p>
                </div>

                <div className="card">
                    <h2>{reports.filter(r => r.status === "SAFE").length}</h2>
                    <p>Safe Events</p>
                </div>

            </div>

            {/* Search & Filter */}

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="ALL">ALL</option>
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="SAFE">SAFE</option>
                </select>

            </div>

            {/* Export Buttons */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "20px"
                }}
            >

                <button
                    onClick={() => window.open(`${API_URL}/export/pdf`, "_blank")}
                >
                    Export PDF
                </button>

                <button
                    onClick={() => window.open(`${API_URL}/export/csv`, "_blank")}
                >
                    Export CSV
                </button>

            </div>

            {/* Reports Table */}

            <table className="table">

                <thead>

                    <tr>
                        <th>Time</th>
                        <th>Source</th>
                        <th>Risk</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {filteredReports.length === 0 ? (

                        <tr>
                            <td
                                colSpan="4"
                                style={{ textAlign: "center" }}
                            >
                                No reports available.
                            </td>
                        </tr>

                    ) : (

                        filteredReports.map((report, index) => (

                            <tr key={index}>

                                <td>{report.time}</td>
                                <td>{report.source}</td>
                                <td>{report.risk}</td>
                                <td>{report.status}</td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default Reports;