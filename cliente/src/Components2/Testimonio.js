import React from "react";
import ProfilePic from "../Assets/servicio9.jpg";
import { AiFillStar } from "react-icons/ai";
import "../testimonio.css";

const Testimonio = () => {
  return (
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Testimonio</p>
      </div>
      <div className="testimonial-section-bottom">
        <img src={ProfilePic} alt="" />
        <p>
        Profesional de la salud 
        altamente capacitada y dedicada que ofrece un servicio
         de atención médica excepcional a sus pacientes. 
        </p>
        <div className="testimonials-stars-container">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
        </div>
        <h2>Dra Mercedes del pino</h2>
      </div>
    </div>
  );
};

export default Testimonio;
