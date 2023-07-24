import React, { useState, useEffect } from "react";
import axios from "axios";
import { Alert } from "react-bootstrap";
import "../reservas.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import esLocale from "@fullcalendar/core/locales/es";

const Reserva = () => {
  const [formData, setFormData] = useState({
    fechaConsulta: new Date().toISOString().split("T")[0], // Asignar la fecha actual por defecto
    hora: "",
    tipoDocumento: "",
    documento: "",
    nombre: "",
    apellido: "",
    telefono: "",
  });
  const [reservations, setReservations] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCedulaErrorAlert, setShowCedulaErrorAlert] = useState(false);
  const [showPasaporteErrorAlert, setShowPasaporteErrorAlert] = useState(false);
  const [showTelefonoErrorAlert, setShowTelefonoErrorAlert] = useState(false);
  const [showInvalidHourAlert, setShowInvalidHourAlert] = useState(false);
  const [showDuplicateCedulaAlert, setShowDuplicateCedulaAlert] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "tipoDocumento") {
      setShowCedulaErrorAlert(false);
      setShowPasaporteErrorAlert(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date();

    const selectedDate = new Date(formData.fechaConsulta + "T" + formData.hora);

    if (selectedDate < currentDate) {
      setShowErrorAlert(true);
      return;
    }

    if (formData.tipoDocumento === "cedula") {
      if (!/^\d{10}$/.test(formData.documento)) {
        setShowCedulaErrorAlert(true);
        return;
      }
    } else if (formData.tipoDocumento === "pasaporte") {
      if (!/^[A-Z0-9]{6,9}$/i.test(formData.documento)) {
        setShowPasaporteErrorAlert(true);
        return;
      }
    }

    // Validación de las horas específicas
    const selectedTime = selectedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const selectedDay = selectedDate.getDay();

    const weekdays = [1, 2, 3, 4, 5]; // Lunes a Viernes
    const saturday = 6; // Sábado

    const validHours =
      (weekdays.includes(selectedDay) &&
        ((selectedTime >= "09:30" && selectedTime <= "12:30") ||
          (selectedTime >= "15:30" && selectedTime <= "17:30"))) ||
      (selectedDay === saturday &&
        selectedTime >= "09:00" &&
        selectedTime <= "14:30");

    if (!validHours) {
      setShowErrorAlert(true);
      setShowInvalidHourAlert(true);
      return;
    }

    try {
      const existingReservations = await axios.get(
        `http://localhost:8080/reservadirecta?fecha=${formData.fechaConsulta}`
      );
      const duplicateCedula = existingReservations.data.some(
        (reservation) =>
          reservation.tipoDocumento === "Cédula" &&
          reservation.documento === formData.documento &&
          reservation.estado === "pendiente"
      );

      if (duplicateCedula) {
        setShowDuplicateCedulaAlert(true);
        setShowSuccessAlert(false); // Ocultar la alerta de éxito si existe un duplicado
        return;
      }

      const requestData = {
        ...formData,
        tipoDocumento:
          formData.tipoDocumento === "cedula" ? "Cédula" : "Pasaporte",
      };

      await axios.post("http://localhost:8080/reservadirecta", requestData);
      setShowSuccessAlert(true); // Mostrar la alerta de éxito
      setFormData({
        fechaConsulta: "",
        hora: "",
        tipoDocumento: "",
        documento: "",
        nombre: "",
        apellido: "",
        telefono: "",
      }); // Restablecer los valores del formulario
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error ===
          "Ya existe una reserva pendiente con el mismo número de cédula en la misma fecha"
      ) {
        setShowDuplicateCedulaAlert(true);
        setShowSuccessAlert(false); // Ocultar la alerta de éxito si existe un duplicado
      } else {
        console.error("Error al realizar la reserva", error);
      }
    }
  };
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const directResponse = await axios.get(
          "http://localhost:8080/reservadirecta"
        );
        const directReservationsData = directResponse.data;

        const indirectResponse = await axios.get(
          "http://localhost:8080/reserva"
        );
        const indirectReservationsData = indirectResponse.data;
        const allReservations = combineReservations(
          directReservationsData,
          indirectReservationsData
        );
        setReservations(allReservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);
  const combineReservations = (directReservations, indirectReservations) => {
    // Combine both arrays of reservations into one
    const allReservations = [...directReservations, ...indirectReservations];
    return allReservations;
  };
 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessAlert(false);
      setShowErrorAlert(false);
      setShowCedulaErrorAlert(false);
      setShowPasaporteErrorAlert(false);
      setShowTelefonoErrorAlert(false);
      setShowInvalidHourAlert(false);
      setShowDuplicateCedulaAlert(false);
    }, 300000); // 5 minutos en milisegundos

    return () => clearTimeout(timeout);
  }, [
    showSuccessAlert,
    setShowSuccessAlert,
    showErrorAlert,
    setShowErrorAlert,
    showCedulaErrorAlert,
    setShowCedulaErrorAlert,
    showPasaporteErrorAlert,
    setShowPasaporteErrorAlert,
    showTelefonoErrorAlert,
    setShowTelefonoErrorAlert,
    showInvalidHourAlert,
    setShowInvalidHourAlert,
    showDuplicateCedulaAlert,
    setShowDuplicateCedulaAlert,
  ]);

  return (
    <div id="reservar" className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Reserva</p>
      </div>
      <div className="work-section-bottom">
        <div className="work-section-info">
          <div className="info-boxes-img-container">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              events={reservations.map((reservation) => ({
                start: reservation.fechaConsulta + "T" + reservation.hora,
                
              }))}
              
            />
          </div>
        </div>
      </div>
      <div className="work-section-bottom">
        <div className="work-section-info">
          <div className="info-boxes-img-container">
            <form onSubmit={handleSubmit}>
              {showErrorAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowErrorAlert(false)}
                    dismissible
                  >
                    Error: La fecha y hora que proporcionaste no es la correcta
                  </Alert>
                </div>
              )}
              {showCedulaErrorAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowCedulaErrorAlert(false)}
                    dismissible
                  >
                    Error: El número de cédula no tiene un formato válido
                  </Alert>
                </div>
              )}
              {showPasaporteErrorAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowPasaporteErrorAlert(false)}
                    dismissible
                  >
                    Error: El pasaporte no tiene un formato válido
                  </Alert>
                </div>
              )}
              {showTelefonoErrorAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowTelefonoErrorAlert(false)}
                    dismissible
                  >
                    Error: El número de teléfono no tiene un formato válido
                  </Alert>
                </div>
              )}
              {showInvalidHourAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowInvalidHourAlert(false)}
                    dismissible
                  >
                    Error: La hora especificada no es de atención médica
                  </Alert>
                </div>
              )}
              {showDuplicateCedulaAlert && (
                <div className="alert-container">
                  <Alert
                    variant="danger"
                    onClose={() => setShowDuplicateCedulaAlert(false)}
                    dismissible
                  >
                    Error: Ya tienes un registro con esa cédula. Espera la
                    aprobación de tu cita.
                  </Alert>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="fechaConsulta" className="form-label">
                  Fecha de consulta
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="fechaConsulta"
                  name="fechaConsulta"
                  value={formData.fechaConsulta}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hora" className="form-label">
                  Hora
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipoDocumento" className="form-label">
                  Tipo de documento
                </label>
                <select
                  id="tipoDocumento"
                  name="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="cedula">Cédula</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              </div>
              {formData.tipoDocumento === "cedula" && (
                <div className="mb-3">
                  <label htmlFor="documento" className="form-label">
                    Número de documento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              {formData.tipoDocumento === "pasaporte" && (
                <div className="mb-3">
                  <label htmlFor="documento" className="form-label">
                    Número de pasaporte
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="documento"
                    name="documento"
                    value={formData.documento}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="apellido" className="form-label">
                  Apellido
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="apellido"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefono" className="form-label">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary custom-button">
                Reservar
              </button>
            </form>
          </div>
        </div>
      </div>

      {showSuccessAlert && (
        <div className="alert-container">
          <Alert
            variant="success"
            onClose={() => setShowSuccessAlert(false)}
            dismissible
          >
            Tu consulta fue reservada con éxito
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Reserva;
