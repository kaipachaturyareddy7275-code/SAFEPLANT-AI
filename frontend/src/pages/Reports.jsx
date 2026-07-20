import { useEffect, useMemo, useState } from "react";

function Reports() {

    const [reports, setReports] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("ALL");

    useEffect(() => {

        const loadReports = () => {

            fetch("http://127.0.0.1:5000/reports")
                .then(res => res.json())
                .then(data => setReports(data));

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

        {/* Analytics Cards */}

        <div className="top-cards">

            <div className="card">
                <h2>{reports.length}</h2>
                <p>Total Incidents</p>
            </div>

            <div className="card">
                <h2>
                    {reports.filter(r => r.status === "HIGH").length}
                </h2>
                <p>High Risk</p>
            </div>

            <div className="card">
                <h2>
                    {reports.filter(r => r.status === "MEDIUM").length}
                </h2>
                <p>Medium Risk</p>
            </div>

            <div className="card">
                <h2>
                    {reports.filter(r => r.status === "SAFE").length}
                </h2>
                <p>Safe Events</p>
            </div>

        </div>

        {/* Search & Filter */}

        <div style={{
            display:"flex",
            gap:"15px",
            marginBottom:"20px"
        }}>

            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />

            <select
                value={filter}
                onChange={(e)=>setFilter(e.target.value)}
            >
                <option>ALL</option>
                <option>HIGH</option>
                <option>MEDIUM</option>
                <option>SAFE</option>
            </select>

        </div>

        <button
        onClick={()=>{
        window.open("http://127.0.0.1:5000/export-csv");
        }}
        >   
        Download CSV
        </button>

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

                {filteredReports.map((report,index)=>(

                    <tr key={index}>

                        <td>{report.time}</td>
                        <td>{report.source}</td>
                        <td>{report.risk}</td>
                        <td>{report.status}</td>

                    </tr>

                ))}

            </tbody>

        </table>

    </div>

);

}

export default Reports;