import "./../styles/dashboardcard.css";

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="dashboard-card">

      <div
        className="card-icon"
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className="card-content">
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>

    </div>
  );
}

export default DashboardCard;