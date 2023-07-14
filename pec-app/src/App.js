import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Lending from "./components/Lending/Lending";
import Dashboard from "./pages/Dashboard";
import UserContext from "./UserContext";
import { v4 as uuid } from "uuid";

function App() {
  const unique_id = uuid();

  const [roomCode, setRoomCode] = React.useState("18498484849984616815151");

  return (
    <>
      <UserContext.Provider value={roomCode}>
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
