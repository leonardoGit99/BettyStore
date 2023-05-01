import { Link } from "react-router-dom"
import { Row, Col, Card, Popover } from 'antd'
//import SignIn from '../components/SignIn'
import Footer from "../components/Footer/Footer";


function redireccionarRegistrarProducto() {
    window.location.href = "/registrarProducto";
}

function redireccionarMostrarInventario() {
    window.location.href = "/mostrarInventario";
}

function redireccionarRegistrarCompra() {
    window.location.href = "/registrarCompra";
}

function redireccionarMostrarCompra() {
    window.location.href = "/mostrarCompra";
}

export default function Home() {
    return (
        <div>
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                    <div>
                        <h1 lg={24} md={24} xs={24} className='tituloHome'>BettyStore</h1>
                        {/*<h2>Página en construcción :)</h2>
                    <img className='homeEnDesarrollo' src='./assets/homePageEnDesarrollo.jpg'></img>*/}
                    </div>
                </Col>
                <Col span={8}></Col>
                {/*<Col span={6}>
                <SignIn/>
            </Col>*/}
            </Row>

            {/*<Row>
                <Col span={24}><p></p></Col>
            </Row>*/}

            <Row>
                <p></p>
            </Row>
            <Row>
                <p></p>
                <Footer />
            </Row>
        </div>
    )
}
