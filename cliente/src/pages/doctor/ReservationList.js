import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../../Style/reservacionList.css';
import Layout from  './../../Components/Layout'

const ReservationList = () => {
  // Estado local para los datos de las reservas normales
 
  


  const [showCreateModal, setShowCreateModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [allReservations, setAllReservations] = useState([]);
  const [alertVariant, setAlertVariant] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showCedulaErrorAlert, setShowCedulaErrorAlert] = useState(false);
  const [showPasaporteErrorAlert, setShowPasaporteErrorAlert] = useState(false);
  const [showTelefonoErrorAlert, setShowTelefonoErrorAlert] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [sortColumn, setSortColumn] = useState(''); // Columna por la que se está ordenando
  const [sortOrder, setSortOrder] = useState('');
  

  // Obtener la fecha actual en formato 'AAAA-MM-DD'
  const today = new Date().toISOString().slice(0, 10);

  const [reservationData, setReservationData] = useState({
    fechaConsulta: today, // Establecer la fecha actual como valor inicial
    hora: '',
    tipoDocumento: '',
    documento: '',
    nombre: '',
    apellido: '',
    telefono: '',
    fechaCreacion: '',
    usuarioCreador: '',
  });
  const [editingFecha, setEditingFecha] = useState(false);
  const { userId } = useSelector((state) => state.user);
  const handleEditFecha = () => {
    setEditingFecha(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
 
    

    if (name === 'tipoDocumento') {
      setShowCedulaErrorAlert(false);
      setShowPasaporteErrorAlert(false);
    }
  };
  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      // Si se hace clic en la misma columna, cambiar el tipo de orden
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Si se hace clic en una columna diferente, establecer esa columna como la columna de ordenamiento y el tipo de orden como ascendente
      setSortColumn(columnName);
      setSortOrder('asc');
    }
  };
  const sortReservations = (data) => {
    if (sortColumn && sortOrder) {
      const sortedData = [...data].sort((a, b) => {
        const propA = a[sortColumn];
        const propB = b[sortColumn];
  
        if (typeof propA === 'string' && typeof propB === 'string') {
          // Si ambas propiedades son cadenas, usar localeCompare para ordenar alfabéticamente
          if (sortOrder === 'asc') {
            return propA.localeCompare(propB);
          } else {
            return propB.localeCompare(propA);
          }
        } else if (typeof propA === 'number' && typeof propB === 'number') {
          // Si ambas propiedades son números, usar operadores de comparación para ordenar numéricamente
          return sortOrder === 'asc' ? propA - propB : propB - propA;
        } else {
          // Si las propiedades no son cadenas ni números, mantener el orden actual
          return 0;
        }
      });
      return sortedData;
    }
    return data;
  };
  
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = allReservations.filter((reservation) => {
      // Cambiar el filtro para buscar por número de cédula
      return reservation.documento.toLowerCase().includes(term);
    });
    setFilteredReservations(filtered);
  };
  



  const handleReservationCreate = async () => {
    try {
      const token = localStorage.getItem('token');

      const dataWithUser = {
        ...reservationData,
        usuarioCreador: userId,
      };

      console.log('Data to be sent:', dataWithUser);

      await axios.post('http://localhost:8080/reserva', dataWithUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchReservations();

      setShowCreateModal(false);
      setAlertMessage('La reserva se creó correctamente.');
      setAlertVariant('success');
      setTimeout(() => {
        setAlertMessage(null);
      }, 3000);
    } catch (error) {
      console.error('Error al crear reserva:', error);
      setAlertMessage('Ocurrió un error al crear la reserva.');
      setAlertVariant('danger');
    }
  };





  const fetchReservations = async () => {
    try {
      const directReservationsResponse = await axios.get('http://localhost:8080/reservadirecta');
      const directReservationsData = directReservationsResponse.data;

      const reservationsResponse = await axios.get('http://localhost:8080/reserva');
      const reservationsData = reservationsResponse.data;

      const combinedReservations = [...reservationsData, ...directReservationsData];
      setAllReservations(combinedReservations);
    } catch (error) {
      console.error('Error al obtener las reservas:', error);
    }
  };

  useEffect(() => {
  
  }, [allReservations]);

  useEffect(() => {
    fetchReservations();
  }, []);

  return (
   
    <div>
       <Layout>
          <div className="center-content">
         
      
   
      <h1>Lista de Reservas</h1>
      </div>
      </Layout>
      <Button
      className=".add-reservation-button"
        variant="primary"
        style={{
          backgroundColor: '#0d506e', // Color azul, puedes cambiarlo a tu preferencia
          color: '#ffff',
          padding: '10px 20px',
          border: 'none',
          fontSize: '18px',
          cursor: 'grab',
          marginTop: '50px', // Ajusta aquí el margen superior para separar el botón de la tabla
          marginLeft: '99px', 
          float: 'right',
          // Ajusta aquí el margen izquierdo para separar el botón del borde izquierdo de la pantalla
  
        }}
        onClick={() => setShowCreateModal(true)}
      >
        Agregar Reserva
      </Button>

      <div>
        
    
    
</div>


    
    <Table striped bordered hover>
        

        <thead>
        <tr>   <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '5px' }}>
      {/* Filtro */}
      <input
          type="text"
          placeholder="Buscar por número de cédula..."
          value={searchTerm}
          onChange={handleSearch}
          className="filter-input"
        />
      </div>
      </tr>
        <tr>

            
              {/* Encabezados de las columnas con evento onClick para manejar el ordenamiento */}
              <th onClick={() => handleSort('fechaConsulta')}>Fecha de Consulta</th>
              <th onClick={() => handleSort('hora')}>Hora</th>
              <th onClick={() => handleSort('nombre')}>Nombre</th>
              <th onClick={() => handleSort('apellido')}>Apellido</th>
              <th onClick={() => handleSort('telefono')}>Teléfono</th>
              <th onClick={() => handleSort('estado')}>Estado de reserva</th>
              <th onClick={() => handleSort('documento')}>Documento</th>
              <th onClick={() => handleSort('usuarioCreador')}>Usuario Creador</th>
              <th onClick={() => handleSort('usuarioModificador')}>Usuario Modificador</th>
              <th onClick={() => handleSort('fechaCreacion')}>Fecha de Creación</th>
              <th onClick={() => handleSort('fechaModificacion')}>Fecha de Modificación</th>
            </tr>
          
     
        
          
        </thead>
        <tbody>
   

            {sortReservations(filteredReservations.length > 0 ? filteredReservations : allReservations).map((reservation) => (
    <tr key={reservation.id}>
              <td>{reservation.fechaConsulta}</td>
              <td>{reservation.hora}</td>
              <td>{reservation.nombre}</td>
              
              <td>{reservation.apellido}</td>
              <td>{reservation.telefono}</td>
              <td>{reservation.estado}</td>
              <td>{reservation.documento}</td>
              <td>
                {reservation.usuarioCreador ? reservation.usuarioCreador.name : 'Reservas creadas por pacientes'}
              </td>
              <td>
                {reservation.usuarioModificador ? reservation.usuarioModificador.name : ''}
              </td>
              <td>{reservation.fechaCreacion}</td>
              <td>{reservation.fechaModificacion}</td>
            </tr>
          ))}
          
        </tbody>
      </Table>
      <div></div>
      <p>Total de Reservas: {allReservations.length}</p>
      
    

      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Reserva</Modal.Title>
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
              {/* Mostrar el campo deshabilitado si no se está editando, de lo contrario, mostrar el campo editable */}
              {editingFecha ? (
                <Form.Control
                  type="date"
                  name="fechaConsulta"
                  value={reservationData.fechaConsulta}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              ) : (
                <Form.Control
                  type="date"
                  name="fechaConsulta"
                  value={reservationData.fechaConsulta}
                  onChange={handleChange}
                  required
                  className="custom-form-control"
                />
              )}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleReservationCreate}>
            Crear Reserva
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReservationList;

