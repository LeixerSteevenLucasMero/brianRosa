import React from "react";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import servicio1 from "../Assets/servicio1.jpg";
import servicio2 from "../Assets/servicio2.jpg";
import servicio3 from "../Assets/servicio3.jpg";
import servicio4 from "../Assets/servicio4.jpg";
import servicio5 from "../Assets/servicio5.jpg";
import servicio6 from "../Assets/servicio6.jpg";
import servicio7 from "../Assets/servicio7.jpg";
import servicio8 from "../Assets/servicio8.jpg";
import "../servicio.css";
import "../animaciones.css";

const images = [
  {
    original: servicio1,
    thumbnail: servicio1,
  },
  {
    original: servicio2,
    thumbnail: servicio2,
  },
  {
    original: servicio3,
    thumbnail: servicio3,
  },
  {
    original: servicio4,
    thumbnail: servicio4,
  },
  {
    original: servicio5,
    thumbnail: servicio5,
  },
  {
    original: servicio6,
    thumbnail: servicio6,
  },
];

const About = () => {
  return (
    <div id="servicios" className="about-section-container">
      <div className="about-section-image-container">
        <ImageGallery items={images} showFullscreenButton={false} autoPlay={true} />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading" style={{ fontFamily: "Cambria", fontSize: "40px", fontWeight: "bold", fontStyle: "italic", color: "#0D506E", textAlign: "center" }}>Nuestros Servicios</p>
        <p className="primary-text" style={{ fontSize: "40px", fontFamily: "Cambria", fontStyle: "italic", color: "#0D506E", textAlign: "center" }}>Ecografías:</p>
        <p className="primary-text"></p>
        <ul className="ecografias-list">
          <li>Obstétricas</li>
          <li>Mamas</li>
          <li>Abdominal</li>
          <li>Ginecológica</li>
          <li>Renal</li>
          <li>Prostáticas</li>
        </ul>
      </div>

      <div className="consultas-container">
        <div className="consultas-image-left-container">
          <img src={servicio7} alt="servicio 7" className="consultas-image-left" />
        </div>
        <div className="consultas-text-container">
          <p className="primary-subheading" style={{ fontFamily: "Cambria", fontSize: "40px", fontWeight: "bold", fontStyle: "italic", color: "#0D506E", textAlign: "center" }}>Nuestros Servicios</p>
          <p className="primary-text" style={{ fontSize: "40px", fontFamily: "Cambria", fontStyle: "italic", color: "#0D506E", textAlign: "center" }}>Consultas:</p>

          <div className="consultas-list-container">
            <div className="consultas-list-column">
              <p className="consultas-list-title">Obstétrica</p>
              <p className="consultas-list-title">Ginecología</p>
              <p className="consultas-list-title">Medicina Interna</p>
            </div>
            <div className="consultas-list-column">
              <p className="consultas-list-title">Planificación Familiar</p>
              <p className="consultas-list-title">Pediatría</p>
              <p className="consultas-list-title">Infertilidad</p>
            </div>
          </div>
        </div>
        <div className="consultas-image-right-container">
          <img src={servicio8} alt="servicio 8" className="consultas-image-right" />
        </div>
      </div>
    </div>
  );
};

export default About;

