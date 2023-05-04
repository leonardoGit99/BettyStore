//import { Link } from "react-router-dom"
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

            <Row gutter={24}>
                <Col span={2}></Col>
                <Col lg={5} span={10}>
                    <p></p>
                    <Card
                        className='cardStyleInventario'
                        title="Inventario"
                        bordered={false}
                        //Este on click intentando que a todo el card se le pueda dar click 
                        onClick={() => redireccionarRegistrarProducto()}
                        hoverable
                        //onClick={(<Link to="/registrarProducto">Registrar Producto</Link>)}
                        cover={<img className="img" alt='ImgRegProd' src='./assets/Inventario-1.jpg'></img>}
                    >
                        <Popover title="En esta sección podrá registrar un producto." trigger="hover">
                            Registrar Producto
                            {/*<Button className="botonCard" href="/registrarProducto" block="true" type="primary">Registrar Producto</Button>*/}
                            {/*<Link className="botonCard" to="/registrarProducto">Registrar Producto</Link>*/}
                        </Popover>
                    </Card>
                </Col>
                <Col lg={5} span={10}>
                    <p></p>
                    <Card
                        className='cardStyleInventario'
                        title="Inventario"
                        bordered={false}
                        hoverable
                        onClick={() => redireccionarMostrarInventario()}
                        cover={<img className="img" alt='ImgRegProd' src='./assets/Inventario-2.jpg'></img>}
                    //onClick={ window.location.href = '/registrarProducto'}
                    >
                        <Popover title="En esta sección le mostrará el inventario." trigger="hover">
                            Mostrar Inventario
                            {/*<Link className="botonCar" to="/registrarProducto">Mostrar Inventario</Link>*/}
                        </Popover>
                    </Card>
                </Col>

                <Col lg={0} span={2}></Col>
                <Col lg={0} span={2}></Col>

                <Col lg={5} span={10}>
                    <p></p>
                    <Card className='cardStyleCompra'
                        title="Compra"
                        bordered={false}
                        hoverable
                        onClick={() => redireccionarRegistrarCompra()}
                        cover={<img className="img" alt='ImgRegProd' src='./assets/Compras-1.jpg'></img>}
                    >
                        <Popover title="En esta sección podrá registrar una compra." trigger="hover">
                            Registrar Compra
                            {/*<Link className="botonCar" to="/registrarProducto">Registrar Compra</Link>*/}
                        </Popover>
                    </Card>
                </Col>
                <Col lg={5} span={10}>
                    <p></p>
                    <Card className='cardStyleCompra'
                        title="Compra"
                        bordered={false}
                        hoverable
                        onClick={() => redireccionarMostrarCompra()}
                        cover={<img className="img" alt='ImgRegProd' src='./assets/Compras-2.jpg'></img>}
                    >
                        <Popover title="En esta sección le mostrará las compras." trigger="hover">
                            Mostrar Compras
                            {/*<Link className="botonCar" to="/registrarProducto">Mostrar Compra</Link>*/}
                        </Popover>
                    </Card>
                </Col>
                <Col span={2}></Col>
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
