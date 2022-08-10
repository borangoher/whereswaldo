import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="homeContent">
      <h2>Where's waldo</h2>
      <p>Welcome to where's waldo!</p>
      <div id="linkButtons">
        <button className="linkButton">
          <Link to={"/game"} className="link">
            Play the Game!
          </Link>
        </button>
        <button className="linkButton">
          <Link to={"/high-scorers"} className="link">
            Check the Scoreboard!
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
