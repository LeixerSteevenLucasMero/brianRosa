const userModel = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require('uuid');
const doctorModel = require("../models/doctorModel");
const appointmentModel = require("../models/appointmentModel");
const moment = require("moment");
// register callback
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({ message: "User Already Exists", success: false });
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({ message: "Registration Successful", success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Registration Controller Error: ${error.message}`,
    });
  }
};
// const blockUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await userModel.findById(id);

//     if (!user) {
//       return res.status(404).send({ message: "Usuario no encontrado" });
//     }

//     // Cambiar el estado de bloqueo del usuario
//     user.blocked = !user.blocked;
//     const updatedUser = await user.save();

//     res.status(200).send({
//       message: user.blocked ? "Usuario bloqueado exitosamente" : "Usuario desbloqueado exitosamente",
//       user: updatedUser
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// };
const blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Aquí asumimos que tienes un campo llamado "blocked" en tu modelo de usuario
    // para indicar si el usuario está bloqueado o no.
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { blocked: true }, // Cambia "blocked" a "true" para bloquear al usuario
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario bloqueado exitosamente", user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};



// login callback
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({ message: "User not found", success: false });
    }

    if (user.blocked) {
      return res.status(200).send({ message: "Usuario bloqueado, comunicarse con administración", success: false });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(200).send({ message: "Invalid Email or Password", success: false });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({ message: "Login Success", success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: `Error in Login CTRL ${error.message}` });
  }
};



const authController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};


const forgotPasswordController = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await userModel.findOne({ name, email });
    if (!user) {
      return res.status(200).send({ success: false, message: "Usuario no encontrado" });
    }

    // Generar un token único para restablecer la contraseña
    const token = generateResetToken(email);

    // Guardar el token de restablecimiento de contraseña en la base de datos
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // El token expira en 1 hora
    await user.save();

    // Enviar el correo electrónico con el enlace para restablecer la contraseña
    const transporter = nodemailer.createTransport({
      // Configura la información de tu servidor de correo electrónico
      host: "smtp.gmail.com", // Servidor SMTP de tu proveedor de correo electrónico
      port: 587, // Puerto del servidor SMTP (generalmente 587 para TLS/STARTTLS o 465 para SSL)
      secure: false, // Establecer a true si el servidor SMTP requiere una conexión SSL
      auth: {
        user: "rosarivera20007@gmail.com", // Nombre de usuario del correo electrónico
        pass: "lfwsrwgsthbxgpvp", // Contraseña del correo electrónico
      },
    });

    const mailOptions = {
      from: "rosarivera20007@gmail.com",
      to: email,
      subject: "Reset Password",
      html: `<p>Estás recibiendo esto porque tú (u otra persona) has solicitado el restablecimiento de la contraseña de tu cuenta.</p>
      <p>Haga clic en el siguiente enlace o péguelo en su navegador para completar el proceso:</p>
        <a href="http://localhost:3000/reset-password/${token}">Restablecer la contraseña</a>
        <p>Si no solicitó esto, ignore este correo electrónico y su contraseña permanecerá sin cambios.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ success: false, message: "No se pudo enviar el correo electrónico" });
      }
      console.log("Email sent:", info.response);
      res.status(200).send({ success: true, message: "Correo electrónico enviado con éxito" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: "Algo salió mal" });
  }
};


const generateResetToken = (email) => {
  // Lógica para generar el token único
  const token = uuidv4();

  // Enviar el correo electrónico con el enlace para restablecer la contraseña
  const transporter = nodemailer.createTransport({
    // Configura la información de tu servidor de correo electrónico
    host: "smtp.gmail.com", // Servidor SMTP de tu proveedor de correo electrónico
    port: 587, // Puerto del servidor SMTP (generalmente 587 para TLS/STARTTLS o 465 para SSL)
    secure: false, // Establecer a true si el servidor SMTP requiere una conexión SSL
    auth: {
      user: "rosarivera20007@gmail.com", // Nombre de usuario del correo electrónico
      pass: "lfwsrwgsthbxgpvp", // Contraseña del correo electrónico
    },
  });

  const mailOptions = {
    from: "rosarivera20007@gmail.com",
    to: email,
    subject: "Restablecimiento de contraseña",
    html: `<p>Aquí está tu enlace de restablecimiento de contraseña: http://localhost:3000/reset-password/${token}</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });

  return token;
};

const resetPasswordController = async (req, res) => {
  try {
    const { token, newPassword, confirmPassword } = req.body;

 

    // Verificar si el token es válido y no ha expirado
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

 

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "El token es inválido o ha expirado",
      });
    }

 

    // Validar que las contraseñas coincidan
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Las contraseñas no coinciden",
      });
    }

 

    // Generar el hash de la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

 

    // Actualizar la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

 

    res.status(200).json({
      success: true,
      message: "La contraseña se ha actualizado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error al restablecer la contraseña",
      error: error.message,
    });
  }
};

// APpply DOctor CTRL
const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({isAdmin: true});
    const notifcation = adminUser.notifcation;
    console.log(adminUser)
    notifcation.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} Has Applied For A Doctor Account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/docotrs",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notifcation });
    res.status(201).send({
      success: true,
      message: "Doctor Account Applied SUccessfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error WHile Applying For Doctotr",
    });
  }
};

// notification ctrl
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notifcation = user.notifcation;
    seennotification.push(...notifcation);
    user.notifcation = [];
    user.seennotification = notifcation;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in notification",
      success: false,
      error,
    });
  }
};

delete notifications
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notifcation = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "Notifications Deleted successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to delete all notifications",
      error,
    });
  }
};

// GET ALL DOC
const getAllDocotrsController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "Listas de médicos obtenidas con éxito",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error al obtener Doctor",
    });
  }
};

// BOOK APPOINTMENT
const bookeAppointmnetController = async (req, res) => {
  try {
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    req.body.status = "pending";
    const newAppointment = new appointmentModel(req.body);
    await newAppointment.save();
    const user = await userModel.findOne({ _id: req.body.doctorInfo.userId });
    user.notifcation.push({
      type: "New-appointment-request",
      message: `A nEw Appointment Request from ${req.body.userInfo.name}`,
      onCLickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Appointment Book succesfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Booking Appointment",
    });
  }
};

// booking bookingAvailabilityController
const bookingAvailabilityController = async (req, res) => {
  try {
    const date = moment(req.body.date, "DD-MM-YY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await appointmentModel.find({
      doctorId,
      date,
      time: {
        $gte: fromTime,
        $lte: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not Availibale at this time",
        success: true,
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointments available",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In Booking",
    });
  }
};

const userAppointmentsController = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({
      userId: req.body.userId,
    });
    res.status(200).send({
      success: true,
      message: "Users Appointments Fetch SUccessfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error In User Appointments",
    });
  }
};







const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, isAdmin, isDoctor, blocked } = req.body;

    // Encriptar la contraseña antes de guardarla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // Guardar la contraseña encriptada en la base de datos
      isAdmin,
      isDoctor,
      blocked,
      // Agrega aquí los otros campos del nuevo usuario si es necesario
    });

    await newUser.save();
    res.status(201).send({ message: "Usuario creado exitosamente", user: newUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUserData = { ...req.body };

    // Si se proporcionó una nueva contraseña en el formulario de edición, encriptarla antes de guardarla
    if (updatedUserData.password) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updatedUserData.password, saltRounds);
      updatedUserData.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(id, updatedUserData, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }

    res.status(200).send({ message: "Usuario actualizado exitosamente", user: updatedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario eliminado exitosamente", user: deletedUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  blockUser,
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
};
