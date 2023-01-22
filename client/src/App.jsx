import { useState } from "react";
import "./App.css";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <main class="h-full">
      <Navbar />
      <div className="flex h-full">
        <Menu />
        <Dashboard />
      </div>
    </main>
  );
}

export default App;
