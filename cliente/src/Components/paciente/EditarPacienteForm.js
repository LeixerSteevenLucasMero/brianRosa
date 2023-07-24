import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditarPacienteForm.css";
import { useSelector } from "react-redux";

const EditarPacienteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const obtenerPaciente = async () => {
      try {
        const response = await axios.get(`/paciente/${id}`);
        setPaciente(response.data);
      } catch (error) {
        // Manejar el error o mostrar un mensaje de error
      }
    };

    obtenerPaciente();
  }, [id]);

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
        usuarioModificador: userId,};
      await axios.put(`/paciente/${id}`, pacienteData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      // Manejar el éxito o mostrar un mensaje de éxito
      navigate("/ListaPacientes");
    } catch (error) {
      // Manejar el error o mostrar un mensaje de error
    }
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <h2>Editar Paciente</h2>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="cedula">Cédula:</label>
              <input
               
                type="text"
                id="cedula"
                className="form-control" // Agrega la clase "form-control"
                value={paciente.cedula}
                onChange={(e) =>
                  setPaciente({ ...paciente, cedula: e.target.value })
                }
              />
            </div>
            <div className="form-group">
            <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                className="form-control" // Agrega la clase "form-control"
                value={paciente.nombre}
                onChange={(e) =>
                  setPaciente({ ...paciente, nombre: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input
                type="text"
                id="apellidos"
                className="form-control" // Agrega la clase "form-control"
                value={paciente.apellidos}
                onChange={(e) =>
                  setPaciente({ ...paciente, apellidos: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="sexo">Sexo:</label>
              <select
                id="sexo"
                value={paciente.sexo}
                onChange={(e) =>
                  setPaciente({ ...paciente, sexo: e.target.value })
                }
              >
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="nacionalidad">Nacionalidad:</label>
              <input
                type="text"
                id="nacionalidad"
                value={paciente.nacionalidad}
                onChange={(e) =>
                  setPaciente({ ...paciente, nacionalidad: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="correoelectronico">Correo Electrónico:</label>
              <input
                type="text"
                id="correoelectronico"
                value={paciente.correoelectronico}
                onChange={(e) =>
                  setPaciente({
                    ...paciente,
                    correoelectronico: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="fechanacimiento">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechanacimiento"
                value={paciente.fechanacimiento}
                onChange={(e) =>
                  setPaciente({ ...paciente, fechanacimiento: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="estadocivil">Estado Civil:</label>
              <input
                type="text"
                id="estadocivil"
                value={paciente.estadocivil}
                onChange={(e) =>
                  setPaciente({ ...paciente, estadocivil: e.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="text"
                id="telefono"
                className="form-control" // Agrega la clase "form-control"
                value={paciente.telefono}
                onChange={(e) =>
                  setPaciente({ ...paciente, telefono: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="canton">Cantón:</label>
              <input
                type="text"
                id="canton"
                value={paciente.canton}
                onChange={(e) =>
                  setPaciente({ ...paciente, canton: e.target.value })
                }
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label htmlFor="provincia">Provincia:</label>
              <input
                type="text"
                id="provincia"
                value={paciente.provincia}
                onChange={(e) =>
                  setPaciente({ ...paciente, provincia: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="parroquia">Parroquia:</label>
              <input
                type="text"
                id="parroquia"
                value={paciente.parroquia}
                onChange={(e) =>
                  setPaciente({ ...paciente, parroquia: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="form-group-Doctor">
          <label htmlFor="doctorresponsable">Doctor Responsable:</label>
          <input
            type="text"
            id="doctorresponsable"
            value={paciente.doctorresponsable}
            onChange={(e) =>
              setPaciente({
                ...paciente,
                doctorresponsable: e.target.value,
              })
            }
          />
        </div>
        <div className="h2-Antecedentes">
          <h2>Antecedentes personales</h2>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="alergiaaines">Alergia a Insectos:</label>
              <input
                type="checkbox"
                id="alergiaaines"
                checked={paciente.alergiaaines}
                onChange={(e) =>
                  setPaciente({ ...paciente, alergiaaines: e.target.checked })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="asma">Asma:</label>
              <input
                type="checkbox"
                id="asma"
                checked={paciente.asma}
                onChange={(e) =>
                  setPaciente({ ...paciente, asma: e.target.checked })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="hta">HTA:</label>
              <input
                type="checkbox"
                id="hta"
                checked={paciente.hta}
                onChange={(e) =>
                  setPaciente({ ...paciente, hta: e.target.checked })
                }
              />
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="hipotiroidismo">Hipotiroidismo:</label>
              <input
                type="checkbox"
                id="hipotiroidismo"
                checked={paciente.hipotiroidismo}
                onChange={(e) =>
                  setPaciente({ ...paciente, hipotiroidismo: e.target.checked })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="tabaquismo">Tabaquismo:</label>
              <input
                type="checkbox"
                id="tabaquismo"
                checked={paciente.tabaquismo}
                onChange={(e) =>
                  setPaciente({ ...paciente, tabaquismo: e.target.checked })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="licor">Licor:</label>
              <input
                type="checkbox"
                id="licor"
                checked={paciente.licor}
                onChange={(e) =>
                  setPaciente({ ...paciente, licor: e.target.checked })
                }
              />
            </div>
          </div>
          </div>
          <div className="form-group">
            <label htmlFor="descripcionalergias">
              Descripción de Alergias:
            </label>
            <textarea
              id="descripcionalergias"
              value={paciente.descripcionalergias}
              onChange={(e) =>
                setPaciente({
                  ...paciente,
                  descripcionalergias: e.target.value,
                })
              }
            />
          </div>
            <div className="form-group">
              <label htmlFor="descripcioncirugias">
                Descripción de Cirugías:
              </label>
              <textarea
                id="descripcioncirugias"
                value={paciente.descripcioncirugias}
                onChange={(e) =>
                  setPaciente({
                    ...paciente,
                    descripcioncirugias: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="descripcionmedicamentos">
                Descripción de Medicamentos:
              </label>
              <textarea
                id="descripcionmedicamentos"
                value={paciente.descripcionmedicamentos}
                onChange={(e) =>
                  setPaciente({
                    ...paciente,
                    descripcionmedicamentos: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="antecedentesfamiliares">
                Antecedentes Familiares:
              </label>
              <textarea
                id="antecendentesfamiliares"
                value={paciente.antecendentesfamiliares}
                onChange={(e) =>
                  setPaciente({
                    ...paciente,
                    antecendentesfamiliares: e.target.value,
                  })
                }
              />
            </div>
         
      
          
            <button type="submit" className="btn btn-primary">
              Guardar Cambios
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

export default EditarPacienteForm;


