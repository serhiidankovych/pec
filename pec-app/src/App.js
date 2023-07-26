import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Lending from "./components/Lending/Lending";
import Dashboard from "./pages/Dashboard";
import UserContext from "./context/UserContext";
import { connectWithSocketIOServer } from "./utils/wss";
import { v4 as uuid } from "uuid";

function App() {
  const roomId = uuid();
  React.useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <>
      <UserContext.Provider value={roomId}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Lending />} />

            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
