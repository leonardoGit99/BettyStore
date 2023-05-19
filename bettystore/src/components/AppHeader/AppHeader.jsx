import { Button } from "antd";
import { BgColorsOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons'
import './AppHeader.css'
import { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Popover } from "antd";

export default function AppHeader(props){
    const {contextTheme, switchTheme} = useContext(ThemeContext)
    
    const onClickSwithButton = () => {
        console.log('Click Change Theme')
        switchTheme()
    }

    function redireccionarLogin() {
        window.location.href = "/";
    }

    return(
        <div className="App-container-header">
            <span><img className="App-image-content" style={{backgroundColor:contextTheme.background}} alt='PruebaImg' src='./assets/logoSuperiorBS (2).png'/></span>
            <span className="App-title-header" style={{color: contextTheme.color, background: contextTheme.background}}>Sistema para Administración de Tienda</span>
            <span> 
                <Popover placement="bottomRight" 
                         trigger={'click'} 
                         arrow={false} 
                         content={<a onClick={() => redireccionarLogin()} ><LogoutOutlined /> Cerrar Sesión</a>} >
                             <span className="ocultar-nombre">Fernando</span><UserOutlined style={{fontSize:'24px',cursor:"pointer"}}/></Popover> 
            </span>
            {/*<Button className="App-context-button" shape="circle" onClick={onClickSwithButton} icon={<BgColorsOutlined />}></Button>*/}
        </div>
    )
}