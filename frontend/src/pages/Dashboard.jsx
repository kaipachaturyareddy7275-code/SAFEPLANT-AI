import { useEffect, useState } from "react";

import DashboardCard from "../components/DashboardCard";

import SensorChart from "../components/SensorChart";

import {
 FaUsers,
 FaClipboardList,
 FaBell,
 FaExclamationTriangle
} from "react-icons/fa";

import "./../styles/dashboard.css";

function Dashboard(){

const [data,setData]=useState(null);

useEffect(()=>{

fetch("http://127.0.0.1:8000/dashboard")
.then(res=>res.json())
.then(data=>setData(data));

},[]);

if(!data)
return <h2>Loading Dashboard...</h2>;

return(

<div className="dashboard">

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
title="Alerts"
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

<h2>Sensor Analytics</h2>

<SensorChart />

</div>

<div className="bottom">

<div className="alerts">

<h2>Recent Alerts</h2>

<ul>

<li>🚨 Gas Leak detected in Zone B</li>

<li>⚠ High Temperature in Zone A</li>

<li>✔ Permit Approved in Zone C</li>

</ul>

</div>

<div className="status">

<h2>Plant Status</h2>

<h1 style={{color:"green"}}>

🟢 ACTIVE

</h1>

<p>

All systems are connected.

</p>

</div>

</div>

</div>

);

}

export default Dashboard;