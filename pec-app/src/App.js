import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Lending from "./components/Lending/Lending";
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lending />}>
         
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="*" element={<Lending />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
