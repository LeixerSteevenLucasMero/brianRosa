import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "./ListaPacientes.css";
import { FaCog } from "react-icons/fa";

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);



  const [editedUser, setEditedUser] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);



  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    try {
      const response = await axios.get("/paciente");
      setPacientes(response.data);
    } catch (error) {}
  };

  const eliminarPaciente = async (id) => {
    try {
      await axios.delete(`/paciente/${id}`);
      obtenerPacientes();
    } catch (error) {}
  };
  const navigate = useNavigate();
  const handleCrearPaciente = () => {
    navigate("/PacienteForm");
  };
  const handleEditarPaciente = (id) => {
    navigate(`/EditarPacienteForm/${id}`);
  };
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedPatientId =
      event.target.selectedOptions[0].getAttribute("data-id");
    if (selectedValue === "ecografia") {
      navigate(`/EcografiaPacienteForm/${selectedPatientId}`);
    } else {
    }
  };
  const handleEditUser = (user) => {
    // Mostrar el formulario emergente de edición con los valores actuales del usuario
    setEditedUser(user);
    setShowEditModal(true);
  };
  const toggleActions = (userId) => {
    if (activeMenu === userId) {
      // Si el menú estaba abierto, lo cerramos
      setActiveMenu(null);
    } else {
      // Si el menú estaba cerrado, lo abrimos
      setActiveMenu(userId);
    }
  };

  return (
    <div>
      <h2>Lista de Pacientes</h2>

      <button className="btn btn-success" onClick={handleCrearPaciente}>
        Crear Paciente
      </button>

      <div>
        <div className="my-custom-table">
          <table className="table table-bordered">
            <thead className="thead-dark table-fixed-header">
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Sexo</th>
                <th>Nacionalidad</th>
                <th>Correo Electrónico</th>
                <th>Fecha de Nacimiento</th>
                <th>Estado Civil</th>
                <th>Teléfono</th>
                <th>Cantón</th>
                <th>Provincia</th>
                <th>Parroquia</th>
                <th>Doctor Responsable</th>
                <th>Usuario Creador</th>
                <th>Fecha de creacion</th>
                <th>Usuario Modificador</th>
                <th>Fecha de Modificaicion</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente._id}>
                  <td>{paciente.cedula}</td>
                  <td>{paciente.nombre}</td>
                  <td>{paciente.apellidos}</td>
                  <td>{paciente.sexo}</td>
                  <td>{paciente.nacionalidad}</td>
                  <td>{paciente.correoelectronico}</td>
                  <td>{paciente.fechanacimiento}</td>
                  <td>{paciente.estadocivil}</td>
                  <td>{paciente.telefono}</td>
                  <td>{paciente.canton}</td>
                  <td>{paciente.provincia}</td>
                  <td>{paciente.parroquia}</td>
                  <td>{paciente.doctorresponsable}</td>
                  <td>{paciente.usuarioCreador}</td>
                  <td>{paciente.fechaCreacion}</td>
                  <td>{paciente.usuarioModificador}</td>
                  <td>{paciente.fechaModificacion}</td>
                  <td>
                    <div className="actions-container">
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleEditarPaciente(paciente._id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => eliminarPaciente(paciente._id)}
                      >
                        Eliminar
                      </button>
                      {/* <Dropdown.Toggle
                        as={FaCog}
                        id={`user-dropdown-${paciente._id}`}
                        className="config-icon"
                        onClick={() => toggleActions(paciente._id)}
                        show={activeMenu === user._id}
                      ></Dropdown.Toggle>
                      <Dropdown.Menu show={activeMenu === user._id}>
                        <Dropdown.Item
                          onClick={() => {
                            handleEditUser(user);
                            toggleActions(user._id);
                          }}
                        >
                          Ecografia
                        </Dropdown.Item>
                      </Dropdown.Menu> */}
                      <select
                        id="ee"
                        className="custom-select btn-secondary"
                        aria-label="Default select example"
                        onChange={handleSelectChange}
                      >
                        <option value=""></option>
                        <option value="ecografia" data-id={paciente._id}>
                          Ecografías
                        </option>
                        <option value="###">###</option>
                        <option value="###">###</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListaPacientes;
