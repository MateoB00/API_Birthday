import React, { useState, useEffect } from "react";
import Logo from "../../assets/circle.svg";
import Star from "../../assets/star.svg";
import Character1 from "../../assets/character_1.svg";
import Character2 from "../../assets/character_2.svg";
import Character3 from "../../assets/character_3.svg";
import Character4 from "../../assets/character_4.svg";
import "./Hero.css";

function Hero() {
  function selectRandomCharacter() {
    const characters = [Character1, Character2, Character3, Character4];
    const randomIndex = Math.floor(Math.random() * characters.length);
    const selectedCharacter = characters[randomIndex];
    return selectedCharacter;
  }

  const prenom = "max";
  const nom = "Holloway";
  const nombre1 = "1";
  const nombre2 = "2";
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [Character, setCharacter] = useState(selectRandomCharacter());
  // const [prenom, setPrenom] = useState('')
  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => {
        setFilled((prev) => {
          const newFilled = prev + 2;
          if (newFilled >= 100) {
            setCharacter(selectRandomCharacter());
            // setPrenom()
            setTimeout(() => {
              setFilled(0);
            }, 0); // Délai de 1 seconde avant de réinitialiser à 0
            return 100; // Assurer que la valeur finale est exactement 100
          }
          return newFilled;
        });
      }, 150);
    }
  }, [filled, isRunning]);
  return (
    <div className="hero">
      <div className="left-container">
        <div className="star1"><img src={Star} alt="Mon Logo" className="stars" /></div>
        <div className="star2"><img src={Star} alt="Mon Logo" className="stars" /></div>
        <div className="star3"><img src={Star} alt="Mon Logo" className="stars" /></div>
        <div className="image1">
          <img src={Logo} alt="Mon Logo" className="rotate-image" />
        </div>
        <p>
          {" "}
          {prenom} {nom}
        </p>
      </div>
      <div className="right-container">
        <div className="card-text">
          <p className="p1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            maiores recusandae pariatur, explicabo id vel nobis? Eaque, harum
            tempore ad saepe rerum aliquid cumque, aperiam officiis fuga
            pariatur numquam nobis!
          </p>
          <p className="p2"> - Michael Jackson</p>
        </div>
        <div className="card-characters">
          <img src={Character} alt="Mon personnage" />
          {/* condition to display the character */}
        </div>
        <div className="container">
          <p className="nombre1">{nombre1}</p>
          <div className="progressbar">
            <div
              style={{
                height: "100%",
                width: `${filled}%`,
                backgroundColor: "#df80ac",
                transition: "width 0.5s",
              }}
            ></div>
            <span>{filled}%</span>
          </div>
          <p className="nombre2">{nombre2}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
