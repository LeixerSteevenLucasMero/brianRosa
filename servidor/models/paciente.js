const mongoose = require("mongoose");
const userModel = require("./userModels");
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const pacienteSchema = new mongoose.Schema({
  id: {
    type: ObjectId,
    unique: true,
    default: () => new ObjectId(),
  },
  cedula: {
    type: String,
    required: false,
  },
  nombre: {
    type: String,
    required: false,
  },
  apellidos: {
    type: String,
    required: false,
  },
  sexo: {
    type: String,
    required: false,
  },
  nacionalidad: {
    type: String,
    required: false,
  },
  correoelectronico: {
    type: String,
    required: false,
  },
  fechanacimiento: {
    type: String,
    required: false,
  },
  estadocivil: {
    type: String,
    required: false,
  },
  telefono: {
    type: String,
    required: false,
  },
  canton: {
    type: String,
    required: false,
  },
  provincia: {
    type: String,
    required: false,
  },
  parroquia: {
    type: String,
    required: false,
  },
  doctorresponsable: {
    type: String,
    required: false,
  },
  alergiaaines: {
    type: Boolean,
    default: false,
  },
  asma: {
    type: Boolean,
    default: false,
  },
  hta: {
    type: Boolean,
    default: false,
  },
  hipotiroidismo: {
    type: Boolean,
    default: false,
  },
  tabaquismo: {
    type: Boolean,
    default: false,
  },
  licor: {
    type: Boolean,
    default: false,
  },
  descripcionalergias: {
    type: String,
    required: false,
  },
  descripcioncirugias: {
    type: String,
    required: false,
  },
  descripcionmedicamentos: {
    type: String,
    required: false,
  },
  antecendentesfamiliares: {
    type: String,
    required: false,
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
});

module.exports = mongoose.model("Paciente", pacienteSchema);




