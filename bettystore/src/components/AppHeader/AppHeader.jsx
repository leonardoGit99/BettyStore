import { Button } from "antd";
import { BgColorsOutlined } from '@ant-design/icons'
import './AppHeader.css'
import { useContext } from 'react';
import { ThemeContext } from "../../contexts/ThemeContext";

export default function AppHeader(props){
    const {contextTheme, switchTheme} = useContext(ThemeContext)
    
    const onClickSwithButton = () => {
        console.log('Click Change Theme')
        switchTheme()
    }

    return(
        <div className="App-container-header">
            <span><img className="App-image-content" style={{backgroundColor:contextTheme.background}} alt='PruebaImg' src='./assets/logoSuperiorBS (2).png'/></span>
            <span className="App-title-header" style={{color: contextTheme.color, background: contextTheme.background}}>Sistema para Administración de Tienda</span>
            {/*<Button className="App-context-button" shape="circle" onClick={onClickSwithButton} icon={<BgColorsOutlined />}></Button>*/}
        </div>
    )
}