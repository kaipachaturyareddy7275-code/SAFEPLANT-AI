import { useEffect, useMemo, useState } from "react";
import "../styles/dashboard.css";

function Permits() {
  const [permits, setPermits] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  useEffect(() => {
    const loadPermits = () => {
      fetch(`${import.meta.env.VITE_API_URL}/permits`)
        .then((res) => res.json())
        .then((data) => setPermits(data))
        .catch((err) => console.log(err));
    };

    loadPermits();

    const timer = setInterval(loadPermits, 3000);

    return () => clearInterval(timer);
  }, []);

  const filteredPermits = useMemo(() => {
    return permits.filter((permit) => {
      const matchesSearch =
        permit.worker.toLowerCase().includes(search.toLowerCase()) ||
        permit.zone.toLowerCase().includes(search.toLowerCase()) ||
        permit.type.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" || permit.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [permits, search, statusFilter]);

  return (
    <div className="dashboard">

      <h1>📋 Permit Intelligence</h1>

      {/* Summary Cards */}

      <div className="top-cards">

        <div className="card">
          <h2>{permits.length}</h2>
          <p>Total Permits</p>
        </div>

        <div className="card">
          <h2>{permits.filter((p) => p.status === "APPROVED").length}</h2>
          <p>Approved</p>
        </div>

        <div className="card">
          <h2>{permits.filter((p) => p.status === "PENDING").length}</h2>
          <p>Pending</p>
        </div>

        <div className="card">
          <h2>{permits.filter((p) => p.status === "EXPIRED").length}</h2>
          <p>Expired</p>
        </div>

      </div>

      {/* Search & Filter */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          margin: "20px 0",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search Worker / Zone / Permit Type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <option value="ALL">All</option>
          <option value="APPROVED">Approved</option>
          <option value="PENDING">Pending</option>
          <option value="EXPIRED">Expired</option>
        </select>
      </div>

      {/* Permit Table */}

      <table className="table">

        <thead>
          <tr>
            <th>Permit ID</th>
            <th>Worker</th>
            <th>Zone</th>
            <th>Type</th>
            <th>Issued</th>
            <th>Expiry</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {filteredPermits.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No permits found
              </td>
            </tr>
          ) : (
            filteredPermits.map((permit, index) => (
              <tr key={index}>
                <td>{permit.id}</td>
                <td>{permit.worker}</td>
                <td>{permit.zone}</td>
                <td>{permit.type}</td>
                <td>{permit.issue_date}</td>
                <td>{permit.expiry_date}</td>
                <td>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      color: "white",
                      background:
                        permit.status === "APPROVED"
                          ? "#16A34A"
                          : permit.status === "PENDING"
                          ? "#F59E0B"
                          : "#DC2626",
                    }}
                  >
                    {permit.status}
                  </span>
                </td>
              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Permits;