import React from "react";

const FormInput = ({ name, type, value, handleChange, labelText }) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input type={type} value={value} name={name} onChange={handleChange} />
    </div>
  );
};

export default FormInput;
