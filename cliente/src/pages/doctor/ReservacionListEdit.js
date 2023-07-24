
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ReservacionListEdit = ({ reservation, fetchReservations }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedData, setEditedData] = useState({ ...reservation });

  const handleEditModalShow = () => {
    setShowEditModal(true);
    setEditedData({ ...reservation });
  };

  const handleEditModalClose = () => {
    setShowEditModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReservationUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (editedData.tipoReserva === 'normal') {
        await axios.put(`http://localhost:8080/reserva/${editedData.id}`, editedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (editedData.tipoReserva === 'directa') {
        await axios.put(`http://localhost:8080/reservadirecta/${editedData.id}`, editedData);
      }

      fetchReservations();
      handleEditModalClose();
    } catch (error) {
      console.error('Error al actualizar reserva:', error);
    }
  };

  return (
    <>
      <Button variant="info" onClick={handleEditModalShow}>
        Editar
      </Button>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Reserva</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Render the form fields for editing */}
            <Form.Group controlId="fechaConsulta">
              <Form.Label>Fecha de consulta</Form.Label>
              <Form.Control
                type="date"
                name="fechaConsulta"
                value={editedData.fechaConsulta}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Add other form fields as needed */}
            <Form.Group controlId="hora">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                name="hora"
                value={editedData.hora}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={editedData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                value={editedData.apellido}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="telefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                name="telefono"
                value={editedData.telefono}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Add any other fields you need to edit */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleReservationUpdate}>
            Actualizar Reserva
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservacionListEdit;
