import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Router } from "express";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </div>
  );
}

export default App;
