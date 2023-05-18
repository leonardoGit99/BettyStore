import React, { useState } from 'react';
import { Row, Col, Form, Input, Button, message, Typography } from 'antd';
import { LoginOutlined, UserOutlined} from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import "./LoginFormStyle.css"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    //    e.preventDefault();
    // Aquí debes implementar la lógica de autenticación con PHP y JWT.
    // Puedes hacer una llamada a la API de backend para verificar las credenciales del usuario.

    // Ejemplo de autenticación ficticia
    if (username === "admin" && password === 'admin123') {
      const user = { username: e.username, role: 'admin' };
      handleLogin(user);
      navigate("/home");
      message.info('Inicio de sesion como Administrador');
    } else if (username === 'vendedor' && password === 'vendedor123') {
      const user = { username: e.username, role: 'vendedor' };
      handleLogin(user);
      navigate("/home");
      message.info('Inicio de sesion como Vendedor');
    } else {
      message.error('Credenciales inválidas');
    }
  };
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  };


  return (
    <Form onFinish={handleSubmit}>
      <Form.Item label="Usuario">
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </Form.Item>
      <Form.Item label="Contraseña">
        <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Iniciar sesión</Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;