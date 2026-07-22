import "./../styles/dashboardCard.css";

function DashboardCard({ title, value, icon, color }) {
    return (
        <div
            className="dashboard-card"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >
            <div className="card-top">

                <div
                    className="card-icon"
                    style={{
                        background: color
                    }}
                >
                    {icon}
                </div>

                <div>

                    <h4>{title}</h4>

                    <h1>{value}</h1>

                </div>

            </div>

            <div className="card-footer">
                Updated Just Now
            </div>

        </div>
    );
}

export default DashboardCard;