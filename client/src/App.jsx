import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";

function App() {
  const [view, setView] = useState("dashboard");

  return (
    <main className="h-full">
      <Navbar />
      <div className="flex h-full">
        <Menu onSelect={(view) => setView(view)} />
        {view === "dashboard" && <Dashboard />}
        {view === "patients" && <Patients />}
      </div>
    </main>
  );
}

export default App;
