const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db.js');
const reservadirectaRoutes = require('./routes/reservadirectaRoutes.js');
const reservaRoutes = require('./routes/reservaRoutes');
const pacienteRoutes = require('./routes/paciente');
const nodemailer = require('nodemailer');

dotenv.config();
connectDB();
const app = express();

// Agrega el middleware de CORS
app.use(cors());

// Habilitar el análisis del cuerpo de la solicitud en formato JSON
app.use(express.json());

// Agregar las rutas a la aplicación
app.use("/admin", require("./routes/adminRoutes"));
app.use("/doctor", require("./routes/doctorRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use('/reserva', reservaRoutes);
app.use('/reservadirecta', reservadirectaRoutes);
app.use('/paciente', pacienteRoutes);

// Generate a random verification code
const generateVerificationCode = () => {
  return Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
};

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rosarivera20007@gmail.com",
    pass: "lfwsrwgsthbxgpvp",
  },
});

// Route to handle sending the verification code via email
app.post("/send_verification_code", (req, res) => {
  const { email } = req.body;

  // Check if the request contains the required parameter
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  // Generate the verification code
  const verificationCode = generateVerificationCode();

  // Compose the email
  const mailOptions = {
    from: "rosarivera20007@gmail.com", // Sender's email address (should be the same as the 'user' in the transporter config)
    to: email, // Recipient's email address
    subject: "Verification Code",
    text: `Your verification code is: ${verificationCode}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to send verification code." });
    }

    console.log("Verification code sent:", info.response);
    return res.status(200).json({ message: "Verification code sent successfully.", code: verificationCode });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`El servidor está corriendo en el puerto ${PORT}`);
});
