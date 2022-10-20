import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <h1 id="logo">
        <Link to={"/whereswaldo"} className="link">
          Waldo
        </Link>
      </h1>
      <h2>
        <Link to={"/whereswaldo"} className="link">
          Home
        </Link>
      </h2>
      <h2>
        <Link to={"/game"} className="link">
          Play
        </Link>
      </h2>
      <h2>
        <Link to={"/high-scores"} className="link">
          Scoreboard
        </Link>
      </h2>
    </div>
  );
};

export default Navbar;
