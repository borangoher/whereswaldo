import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import "./HighScores.css";

const HighScores = (props) => {
  const [highScores, setHighScores] = useState([]);

  const formatCounter = (timeCount) => {
    let seconds = String(timeCount % 60);
    let minutes = String(Math.floor(timeCount / 60));
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const formatResults = async () => {
      const data = await getDocs(collection(props.database, "high-scores"));

      let arr = [];
      data.forEach((doc) => {
        arr.push(doc.data());
      });

      setHighScores(arr.sort((a, b) => a.score - b.score).slice(0, 10));
    };

    formatResults();
  });

  return (
    <div id="scoreContent">
      {highScores.map((score) => {
        return (
          <div className="score">{`${score.name}: ${formatCounter(
            score.score
          )}`}</div>
        );
      })}
    </div>
  );
};

export default HighScores;
