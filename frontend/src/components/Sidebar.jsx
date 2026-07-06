import { Link } from "react-router-dom";
import "./../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <h2>SafePlant AI</h2>

      <Link to="/">Dashboard</Link>

      <Link to="/sensors">Sensors</Link>

      <Link to="/permits">Permits</Link>

      <Link to="/risk">Risk Engine</Link>

      <Link to="/reports">Reports</Link>

      <Link to="/alerts">Alerts</Link>

    </div>
  );
}

export default Sidebar;