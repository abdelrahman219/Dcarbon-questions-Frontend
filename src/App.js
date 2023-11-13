// In the component that renders your routes
import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Disclosures from "./components/Disclosures";
import Questions from "./components/Questions";
const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Disclosures" element={<Disclosures />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>
    </div>
  );
};

export default App;
