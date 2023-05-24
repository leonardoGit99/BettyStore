import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Menu } from "antd"
import './MenuVendedorStyle.css'
import { HomeOutlined } from '@ant-design/icons'
import {  DollarCircleOutlined } from '@ant-design/icons'


const items = [
  { key: "/homeVendedor", label: (<Link to="/homeVendedor">Home</Link>), icon: <HomeOutlined /> },
  {
    key: 2, label: ('Venta'), icon: <DollarCircleOutlined />, children: [
      { key: "/registrarVenta", label: (<Link to="/registrarVenta">Registrar Venta</Link>) },
      { key: "/mostrarVenta", label: (<Link to="/mostrarVenta">Mostrar Venta</Link>) }
    ]
  },
]

export default function MenuVendedor(props) {
  const { contextTheme } = useContext(ThemeContext)

  const location = useLocation();
  const rutaActual = location.pathname;

  // Eliminar la key seleccionada del almacenamiento local del navegador cada vez que se inicia la pagina
  localStorage.removeItem('pestaniaSeleccionada');

  // Obtener la key seleccionada del almacenamiento local del navegador
  const [pestaniaSeleccionada, setPestaniaSeleccionada] = useState(localStorage.getItem('pestaniaSeleccionada') || rutaActual);

  // Actualizar la key seleccionada en el almacenamiento local del navegador
  useEffect(() => {
    localStorage.setItem('pestaniaSeleccionada', pestaniaSeleccionada);
  }, [pestaniaSeleccionada]);


  return (
    <Menu
      className='App-menu'
      theme={contextTheme.name}
      items={items}
      onClick={(e) => setPestaniaSeleccionada(e.key)}
      defaultSelectedKeys={['/homeAdmin']}
      defaultActiveFirst={['/homeAdmin']}
      mode='horizontal'
    />
  )
}