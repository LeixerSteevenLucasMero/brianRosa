const Paciente = require('../models/paciente');

const pacienteController = {};

pacienteController.getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).send(error);
  }
};


pacienteController.createPaciente = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log('ID del usuario logueado:', userId);
    const paciente = new Paciente({
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      sexo: req.body.sexo,
      nacionalidad: req.body.nacionalidad,
      correoelectronico: req.body.correoelectronico,
      fechanacimiento: req.body.fechanacimiento,
      estadocivil: req.body.estadocivil,
      telefono: req.body.telefono,
      canton: req.body.canton,
      provincia: req.body.provincia,
      parroquia: req.body.parroquia,
      doctorresponsable: req.body.doctorresponsable,
      alergiaaines: req.body.alergiaaines,
      asma: req.body.asma,
      hta: req.body.hta,
      hipotiroidismo: req.body.hipotiroidismo,
      tabaquismo: req.body.tabaquismo,
      licor: req.body.licor,
      descripcionalergias: req.body.descripcionalergias,
      descripcioncirugias: req.body.descripcioncirugias,
      descripcionmedicamentos: req.body.descripcionmedicamentos,
      antecendentesfamiliares: req.body.antecendentesfamiliares,
      usuarioCreador: userId,
    });
    
    await paciente.save();
    res.json({ status: 'Paciente guardado' });
  } catch (error) {
    res.status(500).send(error);
  }
  

};


pacienteController.getPaciente = async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id).populate('usuarioCreador usuarioModificador');
    res.json(paciente);
  } catch (error) {
    res.status(500).send(error);
  }
};

const jwt = require('jsonwebtoken'); // Asegúrate de tener el módulo jwt requerido

pacienteController.editPaciente = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    console.log('ID del usuario modificado:', userId);

    const paciente = {
      cedula: req.body.cedula,
      nombre: req.body.nombre,
      apellidos: req.body.apellidos,
      sexo: req.body.sexo,
      nacionalidad: req.body.nacionalidad,
      correoelectronico: req.body.correoelectronico,
      fechanacimiento: req.body.fechanacimiento,
      estadocivil: req.body.estadocivil,
      telefono: req.body.telefono,
      canton: req.body.canton,
      provincia: req.body.provincia,
      parroquia: req.body.parroquia,
      doctorresponsable: req.body.doctorresponsable,
      alergiaaines: req.body.alergiaaines,
      asma: req.body.asma,
      hta: req.body.hta,
      hipotiroidismo: req.body.hipotiroidismo,
      tabaquismo: req.body.tabaquismo,
      licor: req.body.licor,
      descripcionalergias: req.body.descripcionalergias,
      descripcioncirugias: req.body.descripcioncirugias,
      descripcionmedicamentos: req.body.descripcionmedicamentos,
      antecedentesfamiliares: req.body.antecedentesfamiliares
    };

    // Asignar el ID del usuario logueado como modificador del paciente
    paciente.usuarioModificador = userId;
    paciente.fechaModificacion = Date.now();

    const updatedPaciente = await Paciente.findByIdAndUpdate(id, paciente, { new: true });

    if (updatedPaciente) {
      res.json({ status: 'Paciente actualizado', paciente: updatedPaciente });
    } else {
      res.status(404).json({ error: 'Paciente no encontrado' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



pacienteController.deletePaciente = async (req, res) => {
  try {
    await Paciente.findByIdAndRemove(req.params.id);
    res.json({ status: 'Paciente eliminado' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = pacienteController;
