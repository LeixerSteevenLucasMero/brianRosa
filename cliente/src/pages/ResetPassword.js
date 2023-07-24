import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import "../Style/ResetPassword.css";

const ResetPassword = () => {
  const { token } = useParams(); // Obtener el token de los parámetros de la URL

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log(token);
      const res = await axios.post("/user/reset-password", {
        token: token,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword,
      });
      if (res.data.success) {
        message.success("La contraseña se ha restablecido correctamente");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Error al restablecer la contraseña");
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2>Restablecer Contraseña</h2>
      <Form onFinish={onFinish}>
        <Form.Item
          label={<span className="custom-label">Nueva contraseña</span>}
          name="newPassword"
          rules={[
            { required: true, message: "Por favor ingresa tu nueva contraseña" },
          ]}
        >
          <Input.Password placeholder="Nueva contraseña" />
        </Form.Item>
        <Form.Item
          label={<span className="custom-label">Confirmar contraseña</span>}
          name="confirmPassword"
          rules={[
            { required: true, message: "Por favor confirma tu contraseña" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Las contraseñas no coinciden");
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirmar contraseña" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="custom-button">
            Restablecer Contraseña
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
