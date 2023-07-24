import React from "react";
import BannerImage2 from "../Assets/eco.jpeg";
import BannerImage from "../Assets/doc.jpg";
import Navbar from "./Navbar";
import Logo from "../Assets/logi.png";
import { FiArrowRight } from "react-icons/fi";
import "../animaciones.css";

const Home = () => {
  return (
    <div>
      <div style={{ width: "100%", height: "8vh", backgroundColor: "#0D506E" }}>
        <div className="consultorio-text-container">
          <img src={Logo} alt="" />
        </div>
      </div>
      <div className="home-container">
        <Navbar />
        <div className="home-banner-container">
          <div className="home-image-section">
            <img src={BannerImage2} alt="" className="home-image" style={{ animationDelay: "1s" }} />
          </div>
          <div className="home-image-section">
            <img src={BannerImage} alt="" className="home-image" style={{ animationDelay: "2s" }} />
          </div>
        </div>
        <div className="home-text-section">
          <p className="primary-text">
            "Obtén una visión clara y precisa de tu salud con nuestras ecografías en el consultorio Ecográfico <b>Dra. Mercedes Del Pino Caicedo</b>."
          </p>
          <button className="secondary-button">
            Reservar ahora <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default Home;
