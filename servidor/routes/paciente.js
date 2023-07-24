const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Rutas para Paciente
router.post('/', pacienteController.createPaciente);
router.get('/', pacienteController.getPacientes);
router.get('/:id', pacienteController.getPaciente);
router.put('/:id', pacienteController.editPaciente);
router.delete('/:id', pacienteController.deletePaciente);

module.exports = router;
