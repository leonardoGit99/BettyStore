
//Se creó este componente para pruebas
//import './AppHeader.css'
import { useContext } from 'react';


export default function Footer(props){
    function displayYear() {
        return new Date().getFullYear()
    }
    
    return(
        <div className='App-footer'>
            <small>UMSS &copy; - Sistema creado por Team Digital Warriors - Todos los derechos reservados</small> {displayYear()}
        </div>
    )
}