import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Sensors from "./pages/Sensors";
import Permits from "./pages/Permits";
import Risk from "./pages/Risk";
import Reports from "./pages/Reports";
import Alerts from "./pages/Alerts";

import "./styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">

        <Sidebar />

        <div className="main-content">

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/permits" element={<Permits />} />
            <Route path="/risk" element={<Risk />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/alerts" element={<Alerts />} />
          </Routes>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;