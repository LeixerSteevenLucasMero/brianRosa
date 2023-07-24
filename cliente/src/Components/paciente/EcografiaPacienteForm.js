import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EcografiasPacientes.css";
import Layout from "./../../Components/Layout";
import { useSelector } from "react-redux";

const EcografiaPacienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [labelValues, setLabelValues] = useState({});

  useEffect(() => {
    const obtenerPaciente = async () => {
      try {
        const response = await axios.get(`/paciente/${id}`);
        setLabelValues({
          nombre: response.data.nombre,
          apellidos: response.data.apellidos,
          fechaNacimiento: response.data.fechanacimiento,
          sexo: response.data.sexo,
        });
      } catch (error) {}
    };

    obtenerPaciente();
  }, [id]);

  return (
    <Layout>
      <section className="contentt">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12"></div>
            <h2 className="custom-heading">Ecografias</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-label">
              <label id="label1">Informacion del paciente:</label>
            </div>
            <div className="from-text">
              <label>Nombre del paciente:</label>
              <label id="nombre" className="fw-normal">
                {labelValues.nombre} {labelValues.apellidos}
              </label>
            </div>
            <div className="from-text">
              <label>Fecha de nacimiento:</label>
              <label id="fechaNacimiento" className="fw-normal">
                {labelValues.fechaNacimiento}
              </label>
            </div>
            <div className="from-text">
              <label>Sexo:</label>
              <label id="sexo" className="fw-normal">
                {labelValues.sexo}
              </label>
            </div>
          </div>
          <div className="group-button">
            <div
              className="btn-toolbar d-flex justify-content-center"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia obletrica de embarazo temprano
                </button>
              </div>
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia renal
                </button>
              </div>
            </div>
            <div
              className="btn-toolbar d-flex justify-content-center"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia saco gestional
                </button>
              </div>
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia abdominal
                </button>
              </div>
            </div>
            <div
              className="btn-toolbar d-flex justify-content-center"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia ginecológia
                </button>
              </div>
              <div
                className="btn-group me-2 "
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia obletrica de primer trimestre
                </button>
              </div>
            </div>
            <div
              className="btn-toolbar d-flex justify-content-center"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia oblétrica de 2do y tercer trimestre
                </button>
              </div>
              <div
                className="btn-group me-2 "
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia de mamas
                </button>
              </div>
            </div>
            <div
              className="btn-toolbar d-flex justify-content-center"
              role="toolbar"
              aria-label="Toolbar with button groups"
            >
              <div
                className="btn-group me-2"
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia de screning
                </button>
              </div>
              <div
                className="btn-group me-2 "
                role="group"
                aria-label="First group"
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{
                    background: "#0C506E",
                    width: "400px",
                    marginBottom: "20px",
                  }}
                >
                  Ecografia de prostata
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EcografiaPacienteForm;
