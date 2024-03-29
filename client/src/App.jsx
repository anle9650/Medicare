import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Messages from "./components/Messages";

function App() {
  const [view, setView] = useState("dashboard");

  return (
    <main className="h-full">
      {/* <Navbar /> */}
      <div className="flex h-full">
        <Menu onSelect={(view) => setView(view)} />
        <div className="flex-1 p-5">
          {view === "dashboard" && <Dashboard />}
          {view === "patients" && <Patients />}
          {view === "messages" && <Messages />}
          {!["dashboard", "patients", "messages"].includes(view) && (
            <p>Coming soon.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default App;
