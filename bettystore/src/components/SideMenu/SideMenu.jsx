import { Link } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Menu } from "antd"
import './SideMenu.css'

const items = [
    {key: 1, label: (<Link to="/">Home</Link>)},
    {key: 2, label: (<p>Inventario</p>), children:[
        {key:3, label: (<Link to="/registrarProducto">Registrar Producto</Link>)},
        {key:4, label: (<Link to="/inventario">Mostrar Inventario</Link>)}
    ]},
]

export default function SideMenu(props){
    const {contextTheme} = useContext(ThemeContext)
    
    return(
        <Menu 
            className='App-sidemenu'
            theme={contextTheme.name}
            defaultSelectedKeys={['1']}
            items={items}
            mode='inline'
        />
    )
}