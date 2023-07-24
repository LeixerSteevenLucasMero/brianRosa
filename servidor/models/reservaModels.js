const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const reservaSchema = new Schema(
  {
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
    usuarioCreador: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users'
    },
    usuarioModificador: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users',
      default: null
    },
    fechaCreacion: {
      type: Date,
      default: Date.now
    },
    fechaModificacion: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Reserva', reservaSchema);
