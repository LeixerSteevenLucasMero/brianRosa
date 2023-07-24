import React from "react";
import "../contacto.css";
import Maps from "./Mapas/Mapa";

const Contacto = () => {
  return (
    <div id="contactanos" className="contacto-section-container">
      <p className="primary-subheading">Contacto</p>
      <div className="c-secundary-subheading">
        <div className="c-primary-text">
          <div className="primer-titulo">Llamada y mensaje</div>
          Email: doctora@gmail.com
          <br></br>
          whatsapp: 099858858
          <div className="primer-titulo">Direccion</div>
          Los esteros: Av. 103 centro calle 114 y 115 entre el Mercado y el IESS de los Esteros.
          <div className="primer-titulo">Horarios de atención</div>
          Lunes a Viernes: 9:30 - 12:30 / 3:30 - 5:30 Sábado: 9:00 - 2:30
        </div>
        <div className="contacto-section-image-container">
          <Maps />
        </div>
      </div>
    </div>
  );
};

export default Contacto;