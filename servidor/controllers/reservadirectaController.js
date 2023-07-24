const Reserva = require("../models/reservadirectaModels");

const reservaController = {};

reservaController.getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).send(error);
  }
};

reservaController.createReserva = async (req, res) => {
  try {
    const { fechaConsulta, hora, documento, nombre, apellido, telefono } = req.body;

    // Validar formato de teléfono (10 dígitos numéricos)
    if (!/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: "El número de teléfono no tiene un formato válido" });
    }

    // Validar si ya existe una reserva pendiente con el mismo número de cédula en la misma fecha
    const existingReserva = await Reserva.findOne({
      fechaConsulta,
      documento,
      // estado: "pendiente"
    });

    if (existingReserva) {
      return res.status(400).json({ error: "Ya existe una reserva pendiente con el mismo número de cédula en la misma fecha" });
    }

    const reserva = new Reserva({
      fechaConsulta,
      hora,
      documento,
      nombre,
      apellido,
      telefono,
      estado: "pendiente" // Establecer el estado automáticamente
    });

    await reserva.save();
    res.json({ status: "Reserva guardada" });
  } catch (error) {
    res.status(500).send(error);
  }
};


reservaController.getReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id);
    res.json(reserva);
  } catch (error) {
    res.status(500).send(error);
  }
};

reservaController.editReserva = async (req, res) => {
  try {
    const { id } = req.params;
    const { fechaConsulta, hora, documento, nombre, apellido, telefono, estado } = req.body;

    // Validar formato de teléfono (10 dígitos numéricos)
    if (telefono && !/^\d{10}$/.test(telefono)) {
      return res.status(400).json({ error: "El número de teléfono no tiene un formato válido" });
    }

    const reserva = {
      fechaConsulta,
      hora,
      documento,
      nombre,
      apellido,
      telefono,
      estado,
      fechaModificacion: Date.now(), // Agrega la fecha de modificación actual
    };

    await Reserva.findByIdAndUpdate(id, { $set: reserva }, { new: true });
    res.json({ status: "Reserva actualizada" });
  } catch (error) {
    res.status(500).send(error);
  }
};

reservaController.deleteReserva = async (req, res) => {
  try {
    await Reserva.findByIdAndRemove(req.params.id);
    res.json({ status: "Reserva eliminada" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = reservaController;