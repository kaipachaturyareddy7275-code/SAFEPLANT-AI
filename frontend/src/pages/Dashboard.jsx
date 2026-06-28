import { useEffect, useState } from "react";

function Dashboard() {

  const [data, setData] = useState(null);

  useEffect(() => {

    console.log("Dashboard Loaded");

    fetch("http://127.0.0.1:8000/dashboard")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  if (data == null)
    return <h1>Loading Dashboard...</h1>;

  return (
    <div>
      <h1>SafePlant AI</h1>

      <h2>Workers : {data.active_workers}</h2>

      <h2>Permits : {data.active_permits}</h2>

      <h2>Alerts : {data.active_alerts}</h2>

      <h2>Risk : {data.overall_risk}</h2>

    </div>
  );
}

export default Dashboard;