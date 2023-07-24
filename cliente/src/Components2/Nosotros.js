import React from "react";
import NosotrosImage from "../Assets/nosotros.png";
import "../nosotros.css";

const Nosotros = () => {
  return (
    <div id="nosotros" className="nosotros-section-container">  
    
    <p className="primary-subheading" style={{ fontFamily: "Cambria", fontSize: "40px", fontWeight: "bold", fontStyle: "italic", color: "#0D506E", textAlign: "center" }}>Sobre Nosotros</p>  
    <div className="nosotros-section-text-container">
        <div className="n-secundary-subheading">Misión:
        <p className="n-primary-text">
        En el consultorio Ecográfico Dra. Mercedes Del Pino Caicedo, nuestra misión es brindar un servicio de alta calidad y tecnología avanzada para ayudar a nuestros pacientes a comprender mejor su salud y tomar decisiones informadas sobre su bienestar.
        </p>
        </div>
        <div className="nosotros-section-image-container">
        
        <div className="n-section-image-container">
        <img src={NosotrosImage} alt="" />
        </div>
        </div>
        
      <div className="n-secundary-subheading">Visión:
        <p className="n-primary-text">
        Nuestra visión es ser reconocidos como líderes en el campo de la ecografía médica, ofreciendo un servicio excepcional y personalizado a cada uno de nuestros pacientes, y contribuyendo así a mejorar la calidad de vida de la comunidad.
        </p>
        </div>
        </div>
      
    </div>
  );
};

export default Nosotros;
