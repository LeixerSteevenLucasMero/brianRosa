import React, { useState } from "react";
import "../Style/RegisterStyles.css";
import "../Style/Register.css";
import { Form, Input, message, Select } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verificationCode, setVerificationCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  // Function to generate a random verification code
  const generateVerificationCode = () => {
    axios
      .post("/send_verification_code", { email: "arteagaartbry123@gmail.com" })
      .then((response) => {
        message.success("Verification code sent to rosarivera20007@gmail.com");
        setGeneratedCode(response.data.code); // Save the generated code from the response
      })
      .catch((error) => {
        message.error("Failed to send verification code");
      });
  };

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      // Verificar que el código ingresado sea correcto
      if (verificationCode !== generatedCode) {
        dispatch(hideLoading());
        message.error("Código de verificación incorrecto");
        return;
      }

      // Set isDoctor field to true if the user has selected "Doctor" as the userType
      if (values.userType === "Doctor") {
        values.isDoctor = true;
      } else {
        values.isDoctor = false; // Set isDoctor to false for other user types (e.g., "Usuario")
      }

      const res = await axios.post("/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registro Exitoso");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // ... (error handling)
      message.error("Algo salió mal");
    }
  };

  return (
    <div className="container-principal">
      <div className="form-container-secundario">
        <div className="form-content2">
          <div className="formulario corregido">
            <Form layout="vertical" onFinish={onFinishHandler} className="register-form-2">
              <h3 className="text-center">Registrarse</h3>
              <Form.Item label="Nombre" name="name" rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}>
                <Input type="text" />
              </Form.Item>
              <Form.Item
                label="Correo Electrónico"
                name="email"
                rules={[{ required: true, message: "Por favor ingresa tu correo electrónico" }]}
              >
                <Input type="email" />
              </Form.Item>
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[{ required: true, message: "Por favor ingresa tu contraseña" }]}
              >
                <Input type="password" />
              </Form.Item>
              <Form.Item label="Tipo de Usuario" name="userType" initialValue="Usuario">
                <Select style={{ width: "100%" }}>
                  <Option value="Usuario">Usuario</Option>
                  <Option value="Doctor">Doctor</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Código de Verificación"
                name="verificationCode"
                rules={[{ required: true, message: "Por favor ingresa el código de verificación" }]}
              >
                <Input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
              </Form.Item>

              <Link to="/login" className="m-2 register-link">
                Iniciar Sesión
              </Link>
              <button className="btn btn-primary" type="button" onClick={generateVerificationCode}>
                Generar Código de Verificación
              </button>
              <button className="btn btn-primary" type="submit">
                Registrarse
              </button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
