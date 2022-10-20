import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Game from "./components/Game";
import HighScores from "./components/HighScores";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMT9knk3rYEAQ2KmybbVfCI04HSjh0OEE",
  authDomain: "waldo-18779.firebaseapp.com",
  projectId: "waldo-18779",
  storageBucket: "waldo-18779.appspot.com",
  messagingSenderId: "912027317365",
  appId: "1:912027317365:web:1825bccbd8d5b72263f43c",
  measurementId: "G-SDQ2RBT5WJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  return (
    <div className="appContainer">
      <Navbar />
      <Routes>
        <Route path="/whereswaldo" exact element={<Home />} />
        <Route path="/game" element={<Game database={db} />} />
        <Route path="/high-scores" element={<HighScores database={db} />} />
      </Routes>
    </div>
  );
};

export default App;
