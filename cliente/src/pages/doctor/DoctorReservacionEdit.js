import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../../Style/DoctorReservacionEdit.css';

const DoctorReservacionEdit = ({
  reservationId,
  showEditModal,
  onClose,
  onReservationUpdate,
  onReservationdirectaUpdate,
  onDeleteReservation,
  fetchReservations,
  token,
  userId,
  isDirectReservation,
}) => {
  const [reservationData, setReservationData] = useState(null);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reserva/${reservationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const reservation = response.data;
        setReservationData(reservation);
      } catch (error) {
        console.error('Error fetching reservation:', error);
      }
    };

    const fetchReservationDirecta = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/reservadirecta/${reservationId}`);
        const reservation = response.data;
        setReservationData({
          ...reservation,
          reservaDirecta: true,
        });
      } catch (error) {
        console.error('Error fetching directa reservation:', error);
      }
    };

    if (showEditModal) {
      if (isDirectReservation) {
        fetchReservationDirecta();
      } else {
        fetchReservation();
      }
    }
  }, [reservationId, showEditModal, isDirectReservation, token]);

  const handleUpdateReservation = async () => {
    try {
      console.log('Updating reservation:', reservationData);
      const dataWithUser = {
        ...reservationData,
        usuarioModificador: userId,
      };
      await axios.put(`http://localhost:8080/reserva/${reservationId}`, dataWithUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Reservation updated successfully');
      onReservationUpdate(reservationData);
      onClose();
      fetchReservations();
    } catch (error) {
      console.error('Error updating reservation:', error);
    }
  };

  const handleUpdateReservationDirecta = async () => {
    try {
      console.log('Updating directa reservation:', reservationData);
      await axios.put(`http://localhost:8080/reservadirecta/${reservationId}`, reservationData);
      console.log('Directa reservation updated successfully');
      onReservationdirectaUpdate(reservationData);
      onClose();
      fetchReservations();
    } catch (error) {
      console.error('Error updating directa reservation:', error);
    }
  };

  const handleDeleteReservation = async () => {
    try {
      const updatedReservation = {
        ...reservationData,
        estado: 'rechazada',
        usuarioModificador: userId, // Agrega el usuario modificador
      };
      await axios.put(`http://localhost:8080/reserva/${reservationId}`, updatedReservation, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Reservation deleted successfully');
      onDeleteReservation();
      onClose();
      fetchReservations();
    } catch (error) {
      console.error('Error deleting reservation:', error);
    }
  };

  const handleDeleteReservationDirecta = async () => {
    try {
      console.log('Deleting directa reservation:', reservationData);
      await axios.put(`http://localhost:8080/reservadirecta/${reservationId}`);
      console.log('Directa reservation deleted successfully');
      onDeleteReservation();
      onClose();
      fetchReservations();
    } catch (error) {
      console.error('Error deleting directa reservation:', error);
    }
    
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!reservationData || !showEditModal) {
    return null;
  }

  return (
    <Modal show={showEditModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Reserva</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="fechaConsulta">
            <Form.Label>Fecha de consulta</Form.Label>
            <Form.Control
              type="date"
              name="fechaConsulta"
              value={reservationData.fechaConsulta}
              onChange={handleChange}
              required
              className="custom-form-control"
            />
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
          {reservationData.tipoDocumento === 'cedula' && (
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
          {reservationData.tipoDocumento === 'pasaporte' && (
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
          <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              as="select"
              name="estado"
              value={reservationData.estado}
              onChange={handleChange}
              required
              className="custom-form-control"
              disabled={reservationData.estado === 'rechazada'} // Disable when the state is "rechazada"
            >
              <option value="pendiente">Pendiente</option>
              <option value="rechazada">Rechazada</option>
              <option value="aprobada">Aprobada</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        {isDirectReservation ? (
          <>
            {reservationData.estado !== 'rechazada' && ( // Show only when the state is not "rechazada"
              <Button variant="primary" onClick={handleUpdateReservationDirecta}>
                Guardar Cambios.
              </Button>
            )}
            {reservationData.estado === 'rechazada' && (
              <Button variant="danger" onClick={handleDeleteReservationDirecta}>
                Eliminar Reserva.
              </Button>
            )}
          </>
        ) : (
          <>
            {reservationData.estado !== 'rechazada' && ( // Show only when the state is not "rechazada"
              <Button variant="primary" onClick={handleUpdateReservation}>
                Guardar Cambios
              </Button>
            )}
            {reservationData.estado === 'rechazada' && (
              <Button variant="danger" onClick={handleDeleteReservation}>
                Eliminar Reserva
              </Button>
            )}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DoctorReservacionEdit;


