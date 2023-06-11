import { Button } from "antd";
import { BgColorsOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import './AppHeader.css'
import { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Popover, Typography } from "antd";

export default function AppHeader({ props, user, handleLogout }) {
    const { contextTheme, switchTheme } = useContext(ThemeContext)

    const onClickSwithButton = () => {
        console.log('Click Change Theme')
        switchTheme()
    }

    function enviarCerrarSesionAApp() {
        handleLogout(null);
    } 

    return (
      <div className="App-container-header">
        <span><img className="App-image-content" style={{ backgroundColor: contextTheme.background }} alt='PruebaImg' src='./assets/logoSuperiorBS (2).png' /></span>
        <span className="App-title-header" style={{ color: contextTheme.color, background: contextTheme.background }}>Sistema Punto de Venta</span>
        <span>
          <Popover placement="bottomRight"
            trigger={'click'}
            arrow={false}
            content={
              <div>
                <Typography.Text strong className="user-Name">{(user ? user.username : null)} </Typography.Text>
                <a onClick={enviarCerrarSesionAApp} ><LogoutOutlined /> Cerrar Sesión</a>
              </div>
            }>
            <UserOutlined style={{ fontSize: '24px', cursor: "pointer" }} /> <span className="ocultar-nombre">{user ? user.username : null}</span></Popover>
        </span>
        {/*<Button className="App-context-button" shape="circle" onClick={onClickSwithButton} icon={<BgColorsOutlined />}></Button>*/}
      </div>
    )
}