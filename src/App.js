import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Game from "./components/Game";
import HighScores from "./components/HighScores";

const App = () => {
  return (
    <div className="appContainer">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/high-scores" element={<HighScores />} />
      </Routes>
    </div>
  );
};

export default App;
