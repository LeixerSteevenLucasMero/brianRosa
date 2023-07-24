const Reserva = require('../models/reservaModels');
const userModel = require('../models/userModels');
const jwt  = require("jsonwebtoken");
const reservaController = {};

reservaController.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('usuarioCreador usuarioModificador');
    res.json(reservas);
  } catch (error) {
    res.status(500).send(error);
  }
};

reservaController.createReserva = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { fechaConsulta, hora, documento, nombre, apellido, telefono } = req.body;
    const userId = decoded.id;
    console.log('ID del usuario logueado:', userId);

    // Validar formato de teléfono (10 dígitos numéricos)
    if (!/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: 'El número de teléfono no tiene un formato válido' });
    }

    const reserva = new Reserva({
      fechaConsulta,
      hora,
      documento,
      nombre,
      apellido,
      telefono,
      usuarioCreador: userId, // Asignar el ID del usuario logueado como creador de la reserva
      estado: 'pendiente' // Establecer el estado automáticamente
    });

    await reserva.save();

    res.json({ status: 'Reserva guardada' });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Ocurrió un error al guardar la reserva' });
  }
};


reservaController.getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuarioCreador usuarioModificador');
    res.json(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
};

reservaController.editReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { fechaConsulta, hora, documento, nombre, apellido, telefono, estado } = req.body;
    const userId = decoded.id; // Obtener el ID del usuario logueado desde el token
    console.log('ID del usuario modifciado:', userId);

    // Validar formato de teléfono (10 dígitos numéricos)
    if (telefono && !/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: 'El número de teléfono no tiene un formato válido' });
    }

    const reserva = await Reserva.findById(id);

    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }

    // // Verificar si el usuario logueado es el mismo que creó la reserva
    // if (reserva.usuarioCreador.toString() !== userId) {
    //   return res.status(401).json({ error: 'No tienes permiso para editar esta reserva' });
    // }

    reserva.fechaConsulta = fechaConsulta;
    reserva.hora = hora;
    reserva.documento = documento;
    reserva.nombre = nombre;
    reserva.apellido = apellido;
    reserva.telefono = telefono;
    reserva.estado = estado;
    reserva.usuarioModificador = userId; // Asignar el ID del usuario logueado como modificador de la reserva
    reserva.fechaModificacion = Date.now(); // Establecer la fecha y hora actual como fecha de modificación

    await reserva.save();

    res.json({ status: 'Reserva actualizada' });
  } catch (error) {
    console.error('Error al editar reserva:', error);
    res.status(500).json({ error: 'Ocurrió un error al actualizar la reserva' });
  }
};




reservaController.deleteReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndRemove(req.params.id);
    res.json({ status: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = reservaController;

