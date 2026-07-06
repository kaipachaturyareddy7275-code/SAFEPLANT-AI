import { useEffect, useState } from "react";
import "../styles/Reports.css";

function Reports() {
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/report")
  .then((res) => res.json())
  .then((data) => setReport(data))
  .catch((err) => console.error(err));
  }, []);

  if (!report) {
    return <h2>Loading Report...</h2>;
  }

  return (
    <div className="report-container">
      <div className="report-card">

        <h1>AI Incident Report</h1>

        <p><strong>Incident ID:</strong> {report.incident_id}</p>
        <p><strong>Zone:</strong> {report.zone}</p>
        <p><strong>Permit:</strong> {report.permit}</p>

        <p className="risk">
          <strong>Risk:</strong> {report.risk}
        </p>

        <p><strong>Gas Level:</strong> {report.gas_level}%</p>
        <p><strong>Temperature:</strong> {report.temperature} °C</p>
        <p><strong>Pressure:</strong> {report.pressure} PSI</p>

        <h3>Reason</h3>

        <p>{report.reason}</p>

        <h3>Recommended Actions</h3>

        <ul>
          {report.actions.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Status</h3>

        <span className="status">{report.status}</span>

        <div className="button-group">
          <button>Download Report</button>
          <button onClick={() => window.location.reload()}>
            Refresh
          </button>
        </div>

      </div>
    </div>
  );
}

export default Reports;