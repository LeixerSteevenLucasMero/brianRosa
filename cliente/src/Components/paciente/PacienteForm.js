import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PacienteForm.css";

const PacienteForm = () => {
  const [paciente, setPaciente] = useState({
    cedula: "",
    nombre: "",
    apellidos: "",
    sexo: "",
    nacionalidad: "",
    correoelectronico: "",
    fechanacimiento: "",
    estadocivil: "",
    telefono: "",
    canton: "",
    provincia: "",
    parroquia: "",
    doctorresponsable: "",
    alergiaaines: false,
    asma: false,
    hta: false,
    hipotiroidismo: false,
    tabaquismo: false,
    licor: false,
    descripcionalergias: "",
    descripcioncirugias: "",
    descripcionmedicamentos: "",
    antecendentesfamiliares: "",
  });

  const handleChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setPaciente({ ...paciente, [e.target.name]: e.target.checked });
  };

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/ListaPacientes");
  };

  const { userId } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const pacienteData = {
        ...paciente,
        usuarioCreador: userId,
      };
      await axios.post("/paciente", pacienteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Reset form
      setPaciente({
        cedula: "",
        nombre: "",
        apellidos: "",
        sexo: "",
        nacionalidad: "",
        correoelectronico: "",
        fechanacimiento: "",
        estadocivil: "",
        telefono: "",
        canton: "",
        provincia: "",
        parroquia: "",
        doctorresponsable: "",
        alergiaaines: false,
        asma: false,
        hta: false,
        hipotiroidismo: false,
        tabaquismo: false,
        licor: false,
        descripcionalergias: "",
        descripcioncirugias: "",
        descripcionmedicamentos: "",
        antecendentesfamiliares: "",
      });
      // Handle success or display a success message
    } catch (error) {
      // Handle error or display an error message
    }
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <h2>Registro Paciente</h2>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Cédula</label>
              <input
                type="text"
                className="form-control"
                name="cedula"
                value={paciente.cedula}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={paciente.nombre}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Apellidos</label>
              <input
                type="text"
                className="form-control"
                name="apellidos"
                value={paciente.apellidos}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Sexo</label>
              <select
                className="form-control"
                name="sexo"
                value={paciente.sexo}
                onChange={handleChange}
              >
                <option value="">Seleccione</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Nacionalidad</label>
              <input
                type="text"
                className="form-control"
                name="nacionalidad"
                value={paciente.nacionalidad}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                className="form-control"
                name="correoelectronico"
                value={paciente.correoelectronico}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="fechanacimiento"
                value={paciente.fechanacimiento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Estado Civil</label>
              <input
                type="text"
                className="form-control"
                name="estadocivil"
                value={paciente.estadocivil}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                className="form-control"
                name="telefono"
                value={paciente.telefono}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Cantón</label>
              <input
                type="text"
                className="form-control"
                name="canton"
                value={paciente.canton}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Provincia</label>
              <input
                type="text"
                className="form-control"
                name="provincia"
                value={paciente.provincia}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Parroquia</label>
              <input
                type="text"
                className="form-control"
                name="parroquia"
                value={paciente.parroquia}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-group-Doctor">
          <label>Doctor Responsable</label>
          <input
            type="text"
            className="form-control"
            name="doctorresponsable"
            value={paciente.doctorresponsable}
            onChange={handleChange}
          />
        </div>
        <div className="h2-Antecedentes">
          <h2>Antecedentes personales</h2>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="alergiaaines"
                checked={paciente.alergiaaines}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Alergia a Ines</label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="asma"
                checked={paciente.asma}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Asma</label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="hta"
                checked={paciente.hta}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">HTA</label>
            </div>
          </div>
          <div className="col">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="hipotiroidismo"
                checked={paciente.hipotiroidismo}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Hipotiroidismo</label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="tabaquismo"
                checked={paciente.tabaquismo}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Tabaquismo</label>
            </div>
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="licor"
                checked={paciente.licor}
                onChange={handleCheckboxChange}
              />
              <label className="form-check-label">Consumo de Licor</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Descripción de Alergias</label>
          <textarea
            className="form-control"
            name="descripcionalergias"
            value={paciente.descripcionalergias}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Descripción de Cirugías</label>
          <textarea
            className="form-control"
            name="descripcioncirugias"
            value={paciente.descripcioncirugias}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Descripción de Medicamentos</label>
          <textarea
            className="form-control"
            name="descripcionmedicamentos"
            value={paciente.descripcionmedicamentos}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Antecedentes Familiares</label>
          <textarea
            className="form-control"
            name="antecendentesfamiliares"
            value={paciente.antecendentesfamiliares}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default PacienteForm;
