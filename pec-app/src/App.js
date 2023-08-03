import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Lending from "./components/Lending/Lending";
import Dashboard from "./pages/Dashboard";
import { connectWithSocketIOServer } from "./utils/wss";

function App() {
  React.useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Lending />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
