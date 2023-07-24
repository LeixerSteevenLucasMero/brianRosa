const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const { Schema } = mongoose;

const reservadirectaSchema = new Schema({
  id: {
    type: ObjectId,
    unique: true,

    default: () => new ObjectId()
  },
  fechaConsulta: {
    type: String,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  documento: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    default: 'pendiente'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  fechaModificacion: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Reservadirecta', reservadirectaSchema);