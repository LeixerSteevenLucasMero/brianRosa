import React from "react";
import "../Style/RegisterStyles.css";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Style/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserDoctor, faUnlockAlt, faArrowAltCircleRight, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // form handler
  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/user/login", values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/home", { replace: true });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-content">
          <Form layout="vertical" onFinish={onFinishHandler} className="register-form">
            <h3 className="text-center">Iniciar Sesión</h3>
            <Form.Item label="Correo Electrónico" name="email">
              <Input
                type="email"
                required
                className="cambria-fonte"
                prefix={<FontAwesomeIcon icon={faEnvelope} />}
              />
            </Form.Item>
            <Form.Item label="Contraseña" name="password">
              <Input.Password
                required
                className="cambria-fonte"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                prefix={<FontAwesomeIcon icon={faLock} />}
              />
            </Form.Item>
            <Link to="/register" className="m-2 register-link">
              Registrarse
              <FontAwesomeIcon icon={faUserDoctor} className="mr-2" />
            </Link>
            <br />
            <Link to="/forgot-password" className="m-2 contraseña-link">
              Olvidé mi contraseña
              <FontAwesomeIcon icon={faUnlockAlt} className="mr-2" />
            </Link>

            <button className="btn btn-primary" type="submit">
              Acceder
              <FontAwesomeIcon icon={faArrowAltCircleRight} className="mr-2" />
            </button>
          </Form>
        </div>
      </div>
      <div className="right-container">
        <img src={require("../Assets/maquina.png")} alt="Machine" />
      </div>
    </div>
  );
};

export default Login;