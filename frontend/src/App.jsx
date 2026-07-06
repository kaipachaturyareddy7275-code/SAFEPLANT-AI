import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import Permits from "./pages/Permits";
import Risk from "./pages/Risk";
import Reports from "./pages/Reports";

function App() {

  return (

    <div style={{display:"flex"}}>

      <Sidebar />

      <div style={{flex:1}}>

        <Navbar />

        <Routes>

          <Route path="/" element={<Dashboard />} />

          <Route path="/sensors" element={<Sensors />} />

          <Route path="/permits" element={<Permits />} />

          <Route path="/risk" element={<Risk />} />

          <Route path="/reports" element={<Reports />} />

        </Routes>

      </div>

    </div>

  );

}

export default App;