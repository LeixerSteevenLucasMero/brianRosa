const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Base de datos conectada ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error de base de datos ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
