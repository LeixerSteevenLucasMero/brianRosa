import React from "react";
import Logo from "../Assets/logi.png";
import sonido from "../Assets/codigo.png";
import { FaFacebookF } from "react-icons/fa";
import { AiOutlineInstagram } from "react-icons/ai";
import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import "../footer.css";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      {/* Logo */}
      <div className="footer-logo-containerf">
        <img src={Logo} alt="Logo" />
      </div>

      {/* Resto del contenido del footer */}
      <div className="footer-section-two">
        {/* Columna de enlaces */}
        <div className="footer-section-columns">
          <a href="/">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#contactanos">Contactanos</a>
          <a href="#reservar">Reservar</a>
          <a href="/">Login</a>
        </div>

         {/* Columna de íconos */}
         <div className="footer-icons">
          <a href="https://www.instagram.com/dra.mercedesdelpinocaicedo/">
            <AiOutlineInstagram />
          </a>
          <a href="https://wa.link/hzor8e">
            <FaWhatsapp />
          </a>
          <a href="https://www.youtube.com/">
            <HiOutlineMail />
          </a>
          <a href="https://www.facebook.com/dramercedes.delpinocaicedo">
            <FaFacebookF />
          </a>
        </div>
        {/* Columna de información */}
        <div className="footer-section-columns">
          <div className="footer-logo-container">
            <img src={sonido} alt="Servicio" />
            <span>Contactar por Whatsapp</span>
            <br />
            <span>"Dra Mercedes del Pino"</span>
          </div>
        </div>

        {/* Columna de contacto */}
        <div className="footer-section-columns">
          <span>+593 967756185</span>
          <span>Horarios de atención</span>
          <span>Lunes a Viernes: 9:30 - 12:30 / 3:30 - 5:30</span>
          <span>Sábado: 9:00 - 2:30</span>       
        </div>
      </div>
    </div>
  );
};

export default Footer;
