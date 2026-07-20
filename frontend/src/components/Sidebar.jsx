import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaChartLine,
    FaBell,
    FaFileAlt,
    FaMicrochip,
    FaClipboardCheck
} from "react-icons/fa";

function Sidebar() {
    return (
        <div className="sidebar">

            <h2>SafePlant AI</h2>

            <NavLink to="/">
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <NavLink to="/analytics">
                <FaChartLine />
                <span>Analytics</span>
            </NavLink>

            <NavLink to="/sensors">
                <FaMicrochip />
                <span>Sensors</span>
            </NavLink>

            <NavLink to="/permits">
                <FaClipboardCheck />
                <span>Permits</span>
            </NavLink>

            <NavLink to="/risk">
                <FaChartLine />
                <span>Risk Engine</span>
            </NavLink>

            <NavLink to="/reports">
                <FaFileAlt />
                <span>Reports</span>
            </NavLink>

            <NavLink to="/alerts">
                <FaBell />
                <span>Alerts</span>
            </NavLink>

        </div>
    );
}

export default Sidebar;