import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Menu } from "antd"
import './Menu.css'
import { HomeOutlined } from '@ant-design/icons'
import { DatabaseOutlined } from '@ant-design/icons'

const items = [
    {key: 1, label: (<Link to="/">Home</Link>), icon:<HomeOutlined/>},
    {key: 2, label: ('Inventario'),icon:<DatabaseOutlined/> , children:[
        {key:3, label: (<Link to="/registrarProducto">Registrar Producto</Link>)},
        {key:4, label: (<Link to="/mostrarInventario">Mostrar Inventario</Link>)}
    ]},
]

export default function SideMenu(props){
    const {contextTheme} = useContext(ThemeContext)
    /*const [posicionActual, setPosActual] = useState('1');
    const onClick = (e) => {
      console.log('click ', e);
      setPosActual(e.key);
      console.log(e.key);
    };*/

    return(
            <Menu 
            //onClick={onClick}
            className='App-menu'
            theme={contextTheme.name}
            //selectedKeys={[posicionActual]}
            defaultSelectedKeys={['1']}
            items={items}
            mode='horizontal'
            />

    )
}