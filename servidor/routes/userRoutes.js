const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginController,
  registerController,
  authController,
  forgotPasswordController,
  resetPasswordController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getAllDocotrsController,
  bookeAppointmnetController,
  bookingAvailabilityController,
  userAppointmentsController,
  blockUser,
} = require("../controllers/userCtrl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Rutas

router.put('/admin/blockUser/:id', blockUser);

// Obtener todos los usuarios - GET
router.get("/users", getUsers);

// Obtener un usuario por su ID - GET
router.get("/users/:id", getUserById);

// Crear un nuevo usuario - POST
router.post("/users", createUser);

// Actualizar un usuario por su ID - PUT
router.put("/users/:id", updateUser);

// Eliminar un usuario por su ID - DELETE
router.delete("/users/:id", deleteUser);

// Login - POST
router.post("/login", loginController);

// Registro - POST
router.post("/register", registerController);

// Obtener datos del usuario autenticado - POST
router.post("/getUserData", authMiddleware, authController);

// Aplicar para ser doctor - POST
router.post("/apply-doctor", authMiddleware, applyDoctorController);

// Obtener todas las notificaciones del usuario - POST
router.post("/get-all-notification", authMiddleware, getAllNotificationController);

// Olvidó la contraseña - POST
router.post("/forgot-password", forgotPasswordController);

// Restablecer contraseña - POST
router.post("/reset-password", resetPasswordController);

// Eliminar todas las notificaciones del usuario - POST
router.post("/delete-all-notification", authMiddleware, deleteAllNotificationController);

// Obtener todos los doctores - GET
router.get("/getAllDoctors", authMiddleware, getAllDocotrsController);

// Reservar cita - POST
router.post("/book-appointment", authMiddleware, bookeAppointmnetController);

// Verificar disponibilidad de cita - POST
router.post("/booking-availbility", authMiddleware, bookingAvailabilityController);

// Obtener citas del usuario - GET
router.get("/user-appointments", authMiddleware, userAppointmentsController);

module.exports = router;
