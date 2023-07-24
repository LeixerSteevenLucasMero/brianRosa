const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservadirectaController');


// Rutas para Reserva
router.post('/', reservaController.createReserva);
router.get('/', reservaController.getReservas);
router.get('/:id', reservaController.getReserva);
router.put('/:id', reservaController.editReserva);
router.delete('/:id', reservaController.deleteReserva);


module.exports = router;