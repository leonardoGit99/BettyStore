import './App.css';
import { Space, Layout, Col, Row } from 'antd'
import Home from './views/Home';
//import Inventario from './views/RegistrarProducto';

import Menu from './components/Menu/Menu';
import AppHeader from './components/AppHeader/AppHeader';
import { useContext, useState } from 'react';
import { ThemeContext } from './contexts/ThemeContext';
import { Routes, Route } from 'react-router-dom';
import RegistrarProducto from './views/RegistrarProducto';
import MostrarInventario from './views/MostrarInventario';
import TablaInventario from './components/TablaInventario/TablaInventario';
import FormRegProducto from './components/FormularioRegProducto/FormRegProducto';
import MostrarCompra from './views/MostrarCompra';
import RegistrarCompra from './views/RegistrarCompra';
//import Footer from './components/Footer/Footer';

const { Header, Sider, Content } = Layout

function displayYear() {
  return new Date().getFullYear()
}

function App() {
  const [datosTabla, setDatosTabla] = useState([]);

  //Los nombres dentro el useState deben coincidir con los de la API (corregir el envio de parametros en el return)
  const [producto, setProducto] = useState({
    codProd: '',
    nomProd: '',
    categoriaProd: '',
    descripcionProd: '',
    precioProd: '',
    cantidadProd: '',
    fechaProd: '',
    imagenProd: '',
  })

  const { contextTheme } = useContext(ThemeContext)
  //const {contextTheme} = useContext(ThemeContext)
  return (
    <Space direction='vertical' className='App-container'>
      {/*<Layout className='p2'>*/}
      <Content>
        <Header className='App-header' style={{ color: contextTheme.color, background: contextTheme.background }}> <AppHeader /> </Header>
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
              <Menu />
            </Sider>
          </Col>
        </Row>
      </Content>
      <Row>
        <Col span={24}>
          <Content className='App-content'>
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/registrarProducto' element={<FormRegProducto datosTabla={datosTabla} setDatosTabla={setDatosTabla} producto={producto} setProducto={setProducto} />} />
              <Route exact path='/mostrarInventario' element={<TablaInventario datosTabla={datosTabla} setDatosTabla={setDatosTabla} producto={producto} setProducto={setProducto} />} />
              <Route exact path='/registrarCompra' element={<RegistrarCompra />} />
              <Route exact path='/mostrarCompra' element={<MostrarCompra />} />
            </Routes>
          </Content>
        </Col>
      </Row>
      {/*</Layout>*/}
      {/*<Row span={24}>*/}
        {/*<Footer/>*/}
        {/*<Footer className='App-footer'><small>UMSS &copy; - Sistema creado por Team Digital Warriors - Todos los derechos reservados</small> {displayYear()}</Footer>*/}
      {/*</Row>*/}
      {/*</Layout>*/}
    </Space>
  )
}

export default App;
