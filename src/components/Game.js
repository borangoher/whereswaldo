import React, { useEffect, useState } from "react";
import "./Game.css";
import { collection, getDocs, addDoc } from "firebase/firestore";

const Game = (props) => {
  const [timer, setTimer] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [boxLeft, setBoxLeft] = useState(-999);
  const [boxTop, setBoxTop] = useState(-999);
  const [displayLeft, setDisplayLeft] = useState(-999);
  const [displayTop, setDisplayTop] = useState(-999);
  const [waldoFound, setWaldoFound] = useState(false);
  const [odlawFound, setOdlawFound] = useState(false);
  const [wizardFound, setWizardFound] = useState(false);
  const [waldoLocation, setWaldoLocation] = useState({
    posX: -999,
    posY: -999,
  });
  const [odlawLocation, setOdlawLocation] = useState({
    posX: -999,
    posY: -999,
  });
  const [wizardLocation, setWizardLocation] = useState({
    posX: -999,
    posY: -999,
  });

  const BOX_SIDE_LENGTH = 50;

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(collection(props.database, "char-locations"));
      data.forEach((doc) => {
        if (doc.id === "odlaw") {
          setOdlawLocation({
            posX: doc.data().positionX,
            posY: doc.data().positionY,
          });
        } else if (doc.id === "waldo") {
          setWaldoLocation({
            posX: doc.data().positionX,
            posY: doc.data().positionY,
          });
        } else if (doc.id === "wizard") {
          setWizardLocation({
            posX: doc.data().positionX,
            posY: doc.data().positionY,
          });
        }
      });
    };
    getData();
  }, [props.database]);

  useEffect(() => {
    let interval = () => {};
    if (gameStarted) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    if (waldoFound) {
      document.getElementById("charProfiles").children[0].classList.add("dim");
    } else {
      document
        .getElementById("charProfiles")
        .children[0].classList.remove("dim");
    }
    if (odlawFound) {
      document.getElementById("charProfiles").children[1].classList.add("dim");
    } else {
      document
        .getElementById("charProfiles")
        .children[1].classList.remove("dim");
    }
    if (wizardFound) {
      document.getElementById("charProfiles").children[2].classList.add("dim");
    } else {
      document
        .getElementById("charProfiles")
        .children[2].classList.remove("dim");
    }

    if (waldoFound && odlawFound && wizardFound) {
      setGameStarted(false);
      document.getElementById("gameWon").classList.remove("hidden");
    }
  }, [waldoFound, odlawFound, wizardFound]);

  const resetGame = () => {
    setTimer(0);
    setGameStarted(false);
    setWaldoFound(false);
    setOdlawFound(false);
    setWizardFound(false);
    setBoxLeft(-999);
    setBoxTop(-999);
    setDisplayLeft(-999);
    setDisplayTop(-999);
    document.getElementById("dropdown").classList.add("hidden");
    document.getElementById("gameWon").classList.add("hidden");
    document.getElementById("picture").classList.add("hidden");
  };

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

  const onClickPicture = (e) => {
    setBoxLeft(e.pageX - BOX_SIDE_LENGTH / 2);
    setBoxTop(e.pageY - BOX_SIDE_LENGTH / 2);
    setDisplayLeft(e.pageX + BOX_SIDE_LENGTH / 2);
    setDisplayTop(e.pageY + BOX_SIDE_LENGTH / 2);
    e.target.parentElement.lastChild.previousElementSibling.classList.remove(
      "hidden"
    );
  };

  const waldoFunc = () => {
    if (
      boxLeft < waldoLocation.posX &&
      waldoLocation.posX < boxLeft + BOX_SIDE_LENGTH &&
      boxTop < waldoLocation.posY &&
      waldoLocation.posY < boxTop + BOX_SIDE_LENGTH
    ) {
      setWaldoFound(true);
    }
  };

  const odlawFunc = () => {
    if (
      boxLeft < odlawLocation.posX &&
      odlawLocation.posX < boxLeft + BOX_SIDE_LENGTH &&
      boxTop < odlawLocation.posY &&
      odlawLocation.posY < boxTop + BOX_SIDE_LENGTH
    ) {
      setOdlawFound(true);
    }
  };

  const wizardFunc = () => {
    if (
      boxLeft < wizardLocation.posX &&
      wizardLocation.posX < boxLeft + BOX_SIDE_LENGTH &&
      boxTop < wizardLocation.posY &&
      wizardLocation.posY < boxTop + BOX_SIDE_LENGTH
    ) {
      setWizardFound(true);
    }
  };

  const addToDB = async () => {
    const scoreName = prompt("What is your name?");

    const dataRef = await addDoc(collection(props.database, "high-scores"), {
      name: scoreName,
      score: timer,
    });
    console.log(dataRef);
  };

  return (
    <div id="gameContent">
      <button
        id="startButton"
        onClick={(e) => {
          setGameStarted(true);
          e.target.parentElement.lastChild.classList.remove("hidden");
        }}
      >
        Start Game
      </button>
      <div id="charProfiles">
        <img
          src="%PUBLIC_URL%/WaldoChar.png"
          alt="Waldo"
          className="portrait"
        />
        <img
          src="%PUBLIC_URL%/OdlawChar.png"
          alt="Odlaw"
          className="portrait"
        />
        <img
          src="%PUBLIC_URL%/WizardChar.png"
          alt="Wizard"
          className="portrait"
        />
      </div>
      <div id="counter">{formatCounter(timer)}</div>
      <div id="gameWon" className="hidden">
        <p>{`Congrats! Your time was ${formatCounter(
          timer
        )}. You can either try again or submit your high score.`}</p>
        <div id="twoButtons">
          <button onClick={resetGame} className="gameButtons">
            Try Again
          </button>
          <button
            onClick={() => {
              addToDB();
              resetGame();
            }}
            className="gameButtons"
          >
            Post Your Score
          </button>
        </div>
      </div>
      <div
        id="selectBox"
        style={{
          left: boxLeft,
          top: boxTop,
          height: BOX_SIDE_LENGTH,
          width: BOX_SIDE_LENGTH,
        }}
      ></div>
      <div
        id="dropdown"
        style={{
          left: displayLeft,
          top: displayTop,
        }}
        className="hidden"
      >
        <div onClick={waldoFunc}>Waldo</div>
        <div onClick={odlawFunc} id="odlawDrop">
          Odlaw
        </div>
        <div onClick={wizardFunc}>Wizard</div>
      </div>
      <img
        id="picture"
        src="%PUBLIC_URL%/WaldoGame.jpg"
        alt="The Game"
        className="hidden"
        onClick={(e) => onClickPicture(e)}
      />
    </div>
  );
};

export default Game;
