import './App.css';
import { Space, Layout, Col, Row, message, Button } from 'antd'
import Home from './views/Home';
//import Inventario from './views/RegistrarProducto';

import Menu from './components/Menu/Menu';
import AppHeader from './components/AppHeader/AppHeader';
import { useContext, useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = (handleLogout) => {
    setUser(handleLogout);
    message.info("Sesión Cerrada");
  };

  const isAdmin = user && user.role === 'admin';
  const isVendedor = user && user.role === 'vendedor';

  return (

    <Space direction='vertical' className='App-container' >
      <Routes>
        <Route exact path="/" element={<Navigate to="/login" replace />} />
        <Route exact path="/login" element={<LoginForm handleLogin={handleLogin} />} />
        <Route path='/*' element={<AfterLogin />} />
      </Routes>
    </Space>
  );

  function AfterLogin() {
    return (
      <>
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
        <Row>
          <Col span={24}>
            <Content className='App-content'>
              <Routes>
                <>

                  <Route exact path="/home" element={
                    <ProtectedRoute isAllowed={user ? true : false}>
                      <Home />
                    </ProtectedRoute>
                  } />

                  <>
                    <Route element={<ProtectedRoute isAllowed={isAdmin} />}>
                      <Route exact path="/homeAdmin" element={<HomeAdmin />} />
                      <Route exact path="/registrarProducto" element={<FormRegProducto />} />
                      <Route exact path="/mostrarInventario" element={<TablaInventario />} />
                      <Route exact path="/registrarCompra" element={<RegistrarCompra />} />
                      <Route exact path="/mostrarCompra" element={<MostrarCompra />} />
                      <Route path="*" element={<Navigate to="/home" replace />} />
                    </Route>

                  </>

                  <>
                    <Route element={<ProtectedRoute isAllowed={isVendedor} />}>
                      <Route exact path="/homeVendedor" element={<HomeVendedor />} />
                      <Route exact path="/registrarVenta" element={<RegistrarVenta />} />
                      <Route exact path="/mostrarVenta" element={<MostrarVenta />} />
                      <Route path="*" element={<Navigate to="/homeVendedor" replace />} />
                    </Route>

                  </>

                </>

                <Route path="*" element={<Navigate to="/login" replace />} />

              </Routes>
            </Content>
          </Col>
        </Row>
      </>
    );
  }
}

export default App;
