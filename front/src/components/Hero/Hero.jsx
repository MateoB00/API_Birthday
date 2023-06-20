import React, { useState, useEffect } from "react";
import Logo from "../../assets/circle.svg";
import Star from "../../assets/star.svg";
import Character1 from "../../assets/character_1.svg";
import Character2 from "../../assets/character_2.svg";
import Character3 from "../../assets/character_3.svg";
import Character4 from "../../assets/character_4.svg";
import "./Hero.css";

function Hero() {
  const [datas, setDatas] = useState([]);
  const [colors, setColors] = useState("#df80ac");

const toutesCouleurs = ["#098E27","#579FF4","#df80ac","#FCB325"]
  useEffect(() => {
    fetch("/all") // Remplacez "/pays" avec l'URL correcte pour la route de récupération des options
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  function selectRandomCharacter() {
    const characters = [Character1, Character2, Character3, Character4];
    const randomIndex = Math.floor(Math.random() * characters.length);
    const selectedCharacter = characters[randomIndex];
    return selectedCharacter;
  }
  function getRandomColor() {
    const nombersColors = toutesCouleurs.length;
    return Math.floor(Math.random() * nombersColors);
  }
  const nombre1 = "1";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [filled, setFilled] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [Character, setCharacter] = useState(selectRandomCharacter());
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [nombre, setNombre] = useState("");
  const [isBumping, setIsBumping] = useState(false);

  useEffect(() => {
    const bumpInterval = setInterval(() => {
      setIsBumping(true);
      setTimeout(() => {
        setIsBumping(false);
      }, 500);
    }, 5000);
  
    return () => {
      clearInterval(bumpInterval);
    };
  }, []);

  useEffect(() => {
    fetch("/all")
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
        if (data[0]) {
          setNombre(data.length);
          setPrenom(data[0]._firstName);
          setNom(data[0]._lastName);
          setCurrentIndex(1);
          
        }
    
      })
      .catch((error) => {
        console.error("Error fetching options:", error);
      });
  }, []);

  useEffect(() => {
    if (filled < 100 && isRunning) {
      setTimeout(() => {
        setFilled((prev) => {
          const newFilled = prev + 1;
          console.log(prev);
          if (newFilled >= 100) {
            setCharacter(selectRandomCharacter());
            if (datas.length > 0) {
              setPrenom(datas[currentIndex % datas.length]._firstName);
              setNom(datas[currentIndex % datas.length]._lastName);
            }
            setColors(toutesCouleurs[getRandomColor()]);
            console.log("nimporre quoi")
            setCurrentIndex((prevIndex) => prevIndex + 1);
            setTimeout(() => {
              setFilled(0);
            }, 500);
            return 100;
          }
          return newFilled;
        });
      }, 150);
    }
  }, [filled, isRunning, currentIndex, datas]);

  return (
    <div className="hero">
      <div className="left-container" style={{ backgroundColor: colors }}>
        <div className="star1">
          <img src={Star} alt="Mon Logo" className={`stars1 ${isBumping ? "bump" : ""}`} />
        </div>
        <div className="star2">
          <img src={Star} alt="Mon Logo" className={`stars2 ${isBumping ? "bump" : ""}`} />
        </div>
        <div className="star3">
          <img src={Star} alt="Mon Logo" className={`stars3 ${isBumping ? "bump" : ""}`} />
        </div>
        <div className="image1">
          <img src={Logo} alt="Mon Logo" className="rotate-image" />
        </div>
        <p>
          {" "}
          {prenom} {nom}
        </p>
      </div>
      <div className="right-container">
        <div className="card-text" style={{ boxShadow:` 10px 10px 0px ${colors}` }}>
          <p className="p1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            maiores recusandae pariatur, explicabo id vel nobis? Eaque, harum
            tempore ad saepe rerum aliquid cumque, aperiam officiis fuga
            pariatur numquam nobis!
          </p>
          <p className="p2"> - Michael Jackson</p>
        </div>
        <div className="card-characters" style={{ boxShadow:` 10px 10px 0px ${colors}` }}>
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
                backgroundColor: colors,
                transition: "width 0.5s",
              }}
            ></div>
            <span>{filled}%</span>
          </div>
          <p className="nombre2">{nombre}</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
