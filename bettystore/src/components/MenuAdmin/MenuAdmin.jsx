import { Link, useLocation } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Menu } from "antd"
import './MenuAdminStyle.css'
import {HomeOutlined, DatabaseOutlined, ShoppingCartOutlined} from '@ant-design/icons'


const items = [
  { key: "/homeAdmin", label: (<Link to="/homeAdmin">Home</Link>), icon: <HomeOutlined /> },
  {
    key: 2, label: ('Inventario' + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160)), icon: <DatabaseOutlined />,className:"inventario-label", children: [
      { key: "/registrarProducto", label: (<Link to="/registrarProducto">Registrar Producto</Link>) },
      { key: "/mostrarInventario", label: (<Link to="/mostrarInventario">Mostrar Inventario</Link>) }
    ]
  },
  {
    key: 3, label: ('Compra' + String.fromCharCode(160) + String.fromCharCode(160) + String.fromCharCode(160)), icon: <ShoppingCartOutlined />,className:"compras-label", children: [
      { key: "/registrarCompra", label: (<Link to="/registrarCompra">Registrar Compra</Link>) },
      { key: "/mostrarCompra", label: (<Link to="/mostrarCompra">Mostrar Compra</Link>) }
    ]
  },
]

export default function MenuAdmin(props) {
  const { contextTheme } = useContext(ThemeContext)

  const location = useLocation();
  const rutaActual = location.pathname;

  // Eliminar la key seleccionada del almacenamiento local del navegador cada vez que se inicia la pagina
  localStorage.removeItem('pestaniaSeleccionada');

  // Obtener la key seleccionada del almacenamiento local del navegador
  const [pestaniaSeleccionada, setPestaniaSeleccionada] = useState(localStorage.getItem('pestaniaSeleccionada') || rutaActual);
  localStorage.setItem('pestaniaSeleccionada', pestaniaSeleccionada);
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
      defaultSelectedKeys={[pestaniaSeleccionada]}
      mode='horizontal'
    />
  )
}