import React, { useState, useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import "../../Style/reservacion.css";
import esLocale from "@fullcalendar/core/locales/es";

import DoctorReservacionEdit from "./DoctorReservacionEdit";
import { useSelector } from "react-redux";

const DoctorReservacion = () => {
  const [reservations, setReservations] = useState([]);
  const [reservasDirectas, setReservasDirectas] = useState([]);
  const [view, setView] = useState("dayGridMonth");
  const calendarRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservationData, setReservationData] = useState({
    fechaConsulta: "",
    hora: "",
    tipoDocumento: "",
    documento: "",
    nombre: "",
    apellido: "",
    telefono: "",
  });
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedDirectReservation, setSelectedDirectReservation] =
    useState(null);
  const [isDirectReservationModal, setIsDirectReservationModal] =
    useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCedulaErrorAlert, setShowCedulaErrorAlert] = useState(false);
  const [showPasaporteErrorAlert, setShowPasaporteErrorAlert] = useState(false);
  const [showTelefonoErrorAlert, setShowTelefonoErrorAlert] = useState(false);

  const { userId } = useSelector((state) => state.user);

  const fetchReservations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reserva");
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  const fetchReservasDirectas = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reservadirecta");
      setReservasDirectas(response.data);
    } catch (error) {
      console.error("Error fetching direct reservations:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
    fetchReservasDirectas();
  }, []);

  useEffect(() => {
    const events = getEvents();
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.removeAllEvents();
      calendarApi.addEventSource(events);
    }
  }, [reservations, reservasDirectas]);

  const handleViewChange = (newView) => {
    setView(newView);
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
  };

  const getEvents = () => {
    const filteredReservations = reservations.filter(
      (reservation) => reservation.estado !== "rechazada"
    );
    const filteredReservasDirectas = reservasDirectas.filter(
      (reserva) => reserva.estado !== "rechazada"
    );

    const events = filteredReservations.map((reservation) => ({
      _id: reservation._id,
      title: reservation.nombre + " " + reservation.apellido,
      start: new Date(reservation.fechaConsulta + "T" + reservation.hora),
      color: reservation.estado === "pendiente" ? "orange" : "green",
      extendedProps: { estado: reservation.estado },
    }));

    const eventsDirectas = filteredReservasDirectas.map((reservaDirecta) => ({
      _id: reservaDirecta._id,
      title: reservaDirecta.nombre + " " + reservaDirecta.apellido,
      start: new Date(reservaDirecta.fechaConsulta + "T" + reservaDirecta.hora),
      color: reservaDirecta.estado === "pendiente" ? "orange" : "green",
      extendedProps: { estado: reservaDirecta.estado },
    }));

    return [...events, ...eventsDirectas];
  };

  const handleDayCellDidMount = (info) => {
    const { date } = info;
    const dayCellEl = info.el;
    dayCellEl.addEventListener("click", () => handleDateClick(date));
  };


  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
    setReservationData((prevData) => ({
      ...prevData,
      fechaConsulta: date.toISOString().split("T")[0], // Actualiza la fecha en el estado reservationData
    }));
  };

  
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedDate(null);
    setReservationData({
      fechaConsulta: "",
      hora: "",
      tipoDocumento: "",
      documento: "",
      nombre: "",
      apellido: "",
      telefono: "",
    });
    setShowErrorAlert(false);
    setShowCedulaErrorAlert(false);
    setShowPasaporteErrorAlert(false);
    setShowTelefonoErrorAlert(false);
  };

  const handleReservationCreate = async () => {
    try {
      const currentDate = new Date();

      const selectedDate = new Date(
        reservationData.fechaConsulta + "T" + reservationData.hora
      );

      if (selectedDate < currentDate) {
        setShowErrorAlert(true);
        return;
      }

      if (reservationData.tipoDocumento === "cedula") {
        if (!/^\d{10}$/.test(reservationData.documento)) {
          setShowCedulaErrorAlert(true);
          return;
        }
      } else if (reservationData.tipoDocumento === "pasaporte") {
        if (!/^[A-Z0-9]{6,9}$/i.test(reservationData.documento)) {
          setShowPasaporteErrorAlert(true);
          return;
        }
      }

      const dataWithUser = {
        ...reservationData,
        usuarioCreador: userId,
      };

      const token = localStorage.getItem("token"); // Obtén el token de autenticación almacenado localmente

      await axios.post("http://localhost:8080/reserva", dataWithUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReservations();
      setShowModal(false);
      setAlertMessage("La reserva se creó correctamente.");
      setAlertVariant("success");
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error("Error al crear reserva:", error);
      setAlertMessage("Ocurrió un error al crear la reserva.");
      setAlertVariant("danger");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "tipoDocumento") {
      setShowCedulaErrorAlert(false);
      setShowPasaporteErrorAlert(false);
    }
  };

  const handleEditReservation = (eventInfo) => {
    const reservationId = eventInfo.event._def.extendedProps._id;
    const reservation = reservations.find((r) => r._id === reservationId);
    const directReservation = reservasDirectas.find(
      (r) => r._id === reservationId
    );

    if (reservation) {
      setSelectedReservation(reservation);
      setSelectedDirectReservation(null);
      setIsDirectReservationModal(false);
    } else if (directReservation) {
      setSelectedDirectReservation(directReservation);
      setSelectedReservation(null);
      setIsDirectReservationModal(true);
    }

    setShowModal(true);
  };

  const handleSaveReservation = async (editedReservation) => {
    try {
      const currentDate = new Date();

      const selectedDate = new Date(
        editedReservation.fechaConsulta + "T" + editedReservation.hora
      );

      if (selectedDate < currentDate) {
        setShowErrorAlert(true);
        return;
      }

      const token = localStorage.getItem("token");
      const dataWithUser = {
        ...editedReservation,
        usuarioModificador: userId,
      };

      await axios.put(
        `http://localhost:8080/reserva/${editedReservation._id}`,
        dataWithUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchReservations();
      setShowModal(false);
      setAlertMessage("La reserva se actualizó correctamente.");
      setAlertVariant("success");
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error("Error al guardar reserva:", error);
      setAlertMessage("Ocurrió un error al actualizar la reserva.");
      setAlertVariant("danger");
    }
  };

  const handleSaveReservationDirecta = async (editedReservation) => {
    try {
      const currentDate = new Date();

      const selectedDate = new Date(
        editedReservation.fechaConsulta + "T" + editedReservation.hora
      );

      if (selectedDate < currentDate) {
        setShowErrorAlert(true);
        return;
      }

      await axios.put(
        `http://localhost:8080/reservadirecta/${editedReservation._id}`,
        editedReservation
      );
      fetchReservasDirectas();
      setShowModal(false);
      setAlertMessage("La reserva directa se actualizó correctamente.");
      setAlertVariant("success");
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000); // Oculta el mensaje después de 3 segundos
    } catch (error) {
      console.error("Error al guardar reserva directa:", error);
      setAlertMessage("Ocurrió un error al actualizar la reserva directa.");
      setAlertVariant("danger");
    }
  };

  const handleDeleteReservation = async () => {
    try {
      const token = localStorage.getItem("token"); // Obtén el token de autenticación almacenado localmente

      if (selectedReservation) {
        const updatedReservation = {
          ...selectedReservation,
          estado: "rechazada",
          usuarioModificador: userId, // Agrega el usuario modificador
        };

        await axios.put(
          `http://localhost:8080/reserva/${selectedReservation._id}`,
          updatedReservation,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        fetchReservations();
        setShowModal(false);
        setAlertMessage("La reserva se eliminó correctamente.");
        setAlertVariant("success");
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000); // Oculta el mensaje después de 3 segundos
      } else if (selectedDirectReservation) {
        const updatedDirectReservation = {
          ...selectedDirectReservation,
          estado: "rechazada",
        };
        await axios.put(
          `http://localhost:8080/reservadirecta/${selectedDirectReservation._id}`,
          updatedDirectReservation
        );
        fetchReservasDirectas();
        setShowModal(false);
        setAlertMessage("La reserva directa se eliminó correctamente.");
        setAlertVariant("success");
        setTimeout(() => {
          setAlertMessage(null);
        }, 3000); // Oculta el mensaje después de 3 segundos
      }

      setSelectedReservation(null);
      setSelectedDirectReservation(null);
    } catch (error) {
      console.error("Error deleting reservation:", error);
      setAlertMessage("Ocurrió un error al eliminar la reserva.");
      setAlertVariant("danger");
    }
  };

  // const handleDeleteReservation = async () => {
  //   try {
  //     const token = localStorage.getItem('token'); // Obtén el token de autenticación almacenado localmente

  //     const updatedReservation = {
  //       ...selectedReservation,
  //       estado: 'rechazada',
  //       usuarioModificador: userId, // Agrega el usuario modificador
  //     };

  //     await axios.put(`http://localhost:8080/reserva/${selectedReservation._id}`, updatedReservation, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     fetchReservations();
  //     setShowModal(false);
  //     setSelectedReservation(null);
  //   } catch (error) {
  //     console.error('Error deleting reservation:', error);
  //   }
  // };

  const handleCloseEditModal = () => {
    setShowModal(false);
    setSelectedReservation(null);
    setSelectedDirectReservation(null);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowErrorAlert(false);
      setShowCedulaErrorAlert(false);
      setShowPasaporteErrorAlert(false);
      setShowTelefonoErrorAlert(false);
    }, 300000); // 5 minutos en milisegundos

    return () => clearTimeout(timeout);
  }, [
    showErrorAlert,
    setShowErrorAlert,
    showCedulaErrorAlert,
    setShowCedulaErrorAlert,
    showPasaporteErrorAlert,
    setShowPasaporteErrorAlert,
    showTelefonoErrorAlert,
    setShowTelefonoErrorAlert,
  ]);

  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/doctor/Reservalist");
  };


  return (
    <div className="containerc">
      <h1 className="title">Calendario de citas médicas</h1>
      <div className="alert-container">
        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={() => setAlertMessage(null)}
            dismissible
          >
            {alertMessage}
          </Alert>
        )}
      </div>
      <div className="calendar-filter">
        <button className="btn btn-primary" onClick={() => handleCancel(true)}>
          Ver listas de Reserva
        </button>
        <button
          className={`btn ${
            view === "dayGridMonth" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleViewChange("dayGridMonth")}
        >
          Mes
        </button>
        <button
          className={`btn ${
            view === "timeGridWeek" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleViewChange("timeGridWeek")}
        >
          Semana
        </button>
        <button
          className={`btn ${
            view === "timeGridDay" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleViewChange("timeGridDay")}
        >
          Día
        </button>
        <button
          className={`btn ${
            view === "listWeek" ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => handleViewChange("listWeek")}
        >
          Agenda
        </button>
      </div>
      <div className="argen-div">
        <div className="calendar-container">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView={view}
            events={getEvents()}
            dayCellDidMount={handleDayCellDidMount}
            locale={esLocale}
            eventClick={handleEditReservation}
            eventDisplay="auto"
          />
        </div>
      </div>
      {selectedDate && !selectedReservation && !selectedDirectReservation && (
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Crear Nueva Reserva</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
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
              <Form.Group controlId="fechaConsulta">
                <Form.Label>Fecha de consulta</Form.Label>
                <p>{reservationData.fechaConsulta}</p>
              </Form.Group>
              <Form.Group controlId="hora">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  name="hora"
                  value={reservationData.hora}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              </Form.Group>
              <Form.Group controlId="tipoDocumento">
                <Form.Label>Tipo de documento</Form.Label>
                <Form.Control
                  as="select"
                  name="tipoDocumento"
                  value={reservationData.tipoDocumento}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                >
                  <option value="">Seleccionar</option>
                  <option value="cedula">Cédula</option>
                  <option value="pasaporte">Pasaporte</option>
                </Form.Control>
              </Form.Group>
              {reservationData.tipoDocumento === "cedula" && (
                <Form.Group controlId="documento">
                  <Form.Label>Número de documento</Form.Label>
                  <Form.Control
                    type="text"
                    name="documento"
                    value={reservationData.documento}
                    onChange={handleChange}
                    required
                    className="custom-form-control"
                  />
                </Form.Group>
              )}
              {reservationData.tipoDocumento === "pasaporte" && (
                <Form.Group controlId="documento">
                  <Form.Label>Número de pasaporte</Form.Label>
                  <Form.Control
                    type="text"
                    name="documento"
                    value={reservationData.documento}
                    onChange={handleChange}
                    required
                    className="custom-form-control"
                  />
                </Form.Group>
              )}
              <Form.Group controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="nombre"
                  value={reservationData.nombre}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              </Form.Group>
              <Form.Group controlId="apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  type="text"
                  name="apellido"
                  value={reservationData.apellido}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              </Form.Group>
              <Form.Group controlId="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  name="telefono"
                  value={reservationData.telefono}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleReservationCreate}>
              Crear
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {(selectedReservation || selectedDirectReservation) && (
        <DoctorReservacionEdit
          reservationId={
            selectedReservation
              ? selectedReservation._id
              : selectedDirectReservation._id
          }
          showEditModal={showModal}
          onClose={handleCloseEditModal}
          onReservationUpdate={handleSaveReservation}
          onReservationdirectaUpdate={handleSaveReservationDirecta}
          onDeleteReservation={handleDeleteReservation}
          fetchReservations={fetchReservations}
          userId={userId}
          token={localStorage.getItem("token")}
          isDirectReservation={isDirectReservationModal}
        />
      )}
    </div>
  );
};

export default DoctorReservacion;
