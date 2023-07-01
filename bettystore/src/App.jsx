import './App.css';
import { Space, Layout, Col, Row, message, Button } from 'antd'
import Home from './views/Home';
//import Inventario from './views/RegistrarProducto';

import Menu from './components/Menu/Menu';
import AppHeader from './components/AppHeader/AppHeader';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import TablaInventario from './components/TablaInventario/TablaInventario';
import FormRegProducto from './components/FormularioRegProducto/FormRegProducto';
import MostrarCompra from './views/MostrarCompra';
import RegistrarCompra from './views/RegistrarCompra';
import RegistrarVenta from './views/RegistrarVenta';
import MostrarVenta from './views/MostrarVenta';
import LoginForm from './components/LoginForm/LoginForm';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import HomeVendedor from './views/HomeVendedor';
import HomeAdmin from './views/HomeAdmin';
import MenuAdmin from './components/MenuAdmin/MenuAdmin';
import MenuVendedor from './components/MenuVendedor/MenuVendedor';
//import Footer from './components/Footer/Footer';

const { Header, Sider, Content } = Layout

function displayYear() {
  return new Date().getFullYear()
}

function App() {

  const { contextTheme } = useContext(ThemeContext)
  //const {contextTheme} = useContext(ThemeContext)
  const [user, setUser] = useState(null);
  const [sToken, setSToken] = useState('');
  const navigate = useNavigate();

  // Definir el tiempo de inactividad en milisegundos (por ejemplo, 15 minutos)
  var tiempoInactividad = 1 * 40 * 1000; // 35 segundos

  var tiempoCierreSesion; // Variable para almacenar el temporizador de cierre de sesión

  useEffect(() => {
    // Al cargar la página, intentamos recuperar el token JWT del almacenamiento local
    const storedU = localStorage.getItem('usuario');
    const storedR = localStorage.getItem('role');
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      //setSToken(JSON.parse(storedToken));
      const user = { username: JSON.parse(storedU), role: JSON.parse(storedR), token: JSON.parse(storedToken) };
      setUser(user);
    }
  }, []);


  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('usuario', JSON.stringify(userData.username));
    localStorage.setItem('role', JSON.stringify(userData.role));
    localStorage.setItem('token', JSON.stringify(userData.token));
  };

  useEffect(() => {
    function iniciarTemporizadorDeCierreDeSesion() {
      // Reiniciar el temporizador cada vez que ocurra un evento relevante
      clearTimeout(tiempoCierreSesion);

      // Iniciar el temporizador nuevamente
      tiempoCierreSesion = setTimeout(cerrarSesionPorInactividad, tiempoInactividad);
    }

    function cerrarSesionPorInactividad() {
      // Eliminar los datos de la sesión y realizar cualquier otra acción necesaria
      if (localStorage.getItem('token')) {
        setUser(null);
        localStorage.removeItem('usuario');
        localStorage.removeItem('role');
        localStorage.removeItem('token');
        message.info("Sesion cerrada por inactividad");
      }
    }

    // Eventos  para reiniciar el temporizador
    window.addEventListener('mousemove', iniciarTemporizadorDeCierreDeSesion);
    window.addEventListener('keydown', iniciarTemporizadorDeCierreDeSesion);
    window.addEventListener('click', iniciarTemporizadorDeCierreDeSesion);

    // Iniciar el temporizador al cargar la página
    iniciarTemporizadorDeCierreDeSesion();
  }, []);


  const handleLogout = (handleLogout) => {
    setUser(handleLogout);
    localStorage.removeItem('usuario');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    navigate('/');
    message.info("Sesión Cerrada");
  };


  var isAdmin = user && user.token && user.role === 'Administrador';
  var isVendedor = user && user.token && user.role === 'Vendedor';

  return (

    <Space direction='vertical' className='App-container' >
      <Routes>
        {isAdmin || isVendedor ?(
          <Route index path='/*' element={<AfterLogin />} />
        ):(
          <>
            <Route index path="/" element={<Navigate to="/login" replace />} />
            <Route  path="/login" element={<LoginForm handleLogin={handleLogin} />} />
            <Route  path="*" element={<Navigate to="/login" replace />} />
          </>
        )}


      </Routes>
    </Space>
  );

  function AfterLogin() {
    return (
      <div className="App-container">
        {/*<Layout className='p2'>*/}
        <Content>
          <Header className='App-header' style={{ color: contextTheme.color, background: contextTheme.background }}> <AppHeader user={user} handleLogout={handleLogout} />
            {/* <Button style={{ marginLeft: "1300px", position: 'fixed' }} onClick={handleLogout}> Cerrar Sesion</Button> */}
          </Header>
          {/*<Layout className='p1'>*/}
          <Row className='r2'>
            <Col span={24}>
              <Sider
              /*breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={(broken) => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
              }}*/
              >
                {isAdmin ? <MenuAdmin /> : <MenuVendedor />}
                {/* <Menu /> */}
              </Sider>
            </Col>
          </Row>
        </Content>
        {/*<Row>*/}
          <Col className='App-content' span={24}>
            <Content>
              <Routes>
                {/* <Route  path="/home" element={
                    <ProtectedRoute isAllowed={user ? true : false}>
                      <Home />
                    </ProtectedRoute>
                  } /> */}
                {isAdmin ?
                  <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
                    <Route  path="/homeAdmin" element={<HomeAdmin />} />
                    <Route  path="/registrarProducto" element={<FormRegProducto />} />
                    <Route  path="/mostrarInventario" element={<TablaInventario />} />
                    <Route  path="/registrarCompra" element={<RegistrarCompra />} />
                    <Route  path="/mostrarCompra" element={<MostrarCompra />} />
                    <Route  path="/*" element={<Navigate to="/homeAdmin" replace />} />
                  </Route>
                  :
                  <Route element={<ProtectedRoute isAllowed={isVendedor} />}>
                    <Route  path="/homeVendedor" element={<HomeVendedor />} />
                    <Route  path="/registrarVenta" element={<RegistrarVenta />} />
                    <Route  path="/mostrarVenta" element={<MostrarVenta />} />
                    <Route  path="/*" element={<Navigate to="/homeVendedor" replace />} />
                  </Route>
                }

              </Routes>
            </Content>
          </Col>
        {/*</Row>*/}
      </div>
    );
  }
}

export default App;
