import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Input, Button, message, Typography } from 'antd';
import { LoginOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from '../customHooks/useLocalStorage';
import axios from 'axios';
import "./LoginFormStyle.css"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState();
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    const datos = new FormData();
    datos.append("usuario", username);
    datos.append("contrasenia", password);

    console.log(datos.get("usuario"));
    console.log(datos.get("contrasenia"));

    axios.post('http://localhost/IndexConsultasTercerSprint/indexLoginAdministrador.php/?login=1', datos)
      .then(response => {
        console.log(response);
        setToken(response.data.token);
      }).catch(error => {
        console.log(error);
        axios.post("http://localhost/IndexConsultasTercerSprint/indexLoginVendedor.php/?login=1", datos)
          .then(response => {
            console.log(response);
            setToken(response.data.token);
          }).catch(error => {
            console.log(error);
            message.error('Credenciales incorrectos');
          })
      }
      )
  };

  useEffect(() => {
    if (token) {
      console.log(token);
      var valoresToken = JSON.parse(atob(token.split('.')[1]));
      console.log(valoresToken);
      console.log(valoresToken.usuario);
      console.log(valoresToken.role);
      const user = { username: valoresToken.usuario, role: valoresToken.role, token: token};
      handleLogin(user);
      if (valoresToken.role === 'Administrador') {
        message.info('Inicio de sesión como Administrador');
      } else if (valoresToken.role === 'Vendedor') {
        message.info('Inicio de sesión como Vendedor');
      }
    }
  }, [token]);



  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 24
    }
  };


  return (
    <Row justify={'center'} align={'middle'}>
      {/*Imagen de la columna izquierda*/}
      <Col lg={16} xs={24} sm={24} className="container-img-form">

        <img className="imgIni" alt='ImgIniSes' src='./assets/laptopShop.png'></img>

      </Col>
      {/*Formulario de Inicio de Sesion*/}

      <Col lg={8} xs={20} sm={14} >
        <Row><p></p></Row>
        <Row align='middle'>
          <Col span={24} className="container-form-Inises">
            <Row><p></p></Row>
            <Row justify={'center'}>
              <span><img className="App-image-iniSesion"
                alt='PruebaImg'
                src='./assets/logoSuperiorBS (2).png' />
              </span>
            </Row>
            <Row justify={'center'}>
              <Col span={24} align={'middle'} >
                <Typography.Title level={1} className="tit-1">¡Bienvenido!</Typography.Title>
                <Typography.Text type="secondary"  >Ingrese sus datos de acceso <br /><br /> </Typography.Text>
              </Col>
            </Row>
            <Row >
              <Col lg={1} xs={1}></Col>
              <Col lg={22} xs={22} >
                <Form {...layout}
                  className="login-form"
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    label="Usuario"
                    labelAlign="left"
                    name="username"
                    rules={[{ required: true, message: 'Por favor ingresa tu usuario' }]}
                  >
                    <Input
                      autoComplete='off'
                      suffix={<UserOutlined />}
                      placeholder="Ingrese su usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    label="Contraseña"
                    labelAlign="left"
                    name="password"
                    rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                  >
                    <Input.Password
                      placeholder="Ingrese su contraseña"
                      value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" block htmlType="submit" icon={<LoginOutlined />}>
                      Iniciar sesión
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col lg={1} xs={1}></Col>
            </Row>
            <Row justify={'center'} >
              <Col align={'middle'}>
                <Typography.Paragraph> <br /><br />Copyright © 2023 DigitalWarriors Todos los derechos reservados.</Typography.Paragraph>
              </Col>
            </Row>

          </Col>

        </Row>

      </Col>
    </Row>
  );
};

export default LoginForm;