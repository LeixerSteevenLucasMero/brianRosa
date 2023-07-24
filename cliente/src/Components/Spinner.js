//  import { useState, CSSProperties } from "react";
//  import ClipLoader from "react-spinners/CircleLoader";

import React from "react";

const Spinner = () => {
    return (
       <div className="d-flex justify-content-center spinner">
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Cargando</span>
  </div>
</div>

    )
}
export default Spinner