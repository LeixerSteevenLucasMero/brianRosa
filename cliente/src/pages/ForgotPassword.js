import React from "react";
import { Form, Input, Button, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUndo } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Style/ForgotPassword.css";

const ForgotPassword = () => {
  const onFinish = async (values) => {
    try {
      const res = await axios.post("/user/forgot-password", { name: values.name, email: values.email });
      if (res.data.success) {
        message.success("Se ha enviado un correo electrónico con las instrucciones para restablecer la contraseña");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error al enviar la solicitud de restablecimiento de contraseña");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Solicitud de Restablecimiento de Contraseña</h2>
      <div className="reset-icon">
        <FontAwesomeIcon icon={faUndo} />
      </div>
      <Form onFinish={onFinish}>
        <Form.Item
          label={<span className="custom-label">Ingrese nombre de usuario</span>}
          name="name"
          rules={[
            { required: true, message: "Por favor ingresa tu nombre de usuario" },
          ]}
        >
          <Input style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item
          label={<span className="custom-label">Ingrese correo electrónico</span>}
          name="email"
          rules={[
            { required: true, message: "Por favor ingresa tu correo electrónico" },
            { type: "email", message: "Por favor ingresa un correo electrónico válido" },
          ]}
        >
          <Input style={{ fontSize: "16px" }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block className="custom-button">
            Restablecer
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;

