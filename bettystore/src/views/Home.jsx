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

const textoCardRegistrarProducto = (
    <div align='center'>En esta sección podrá registrar un nuevo<br></br>
    producto a través de un formulario que le <br></br>
    permitirá llenar datos del mismo.</div>
);

const textoCardMostrarInventario= (
    <div align='center'>En esta sección podrá ver el Inventario <br></br>
    en una tabla con los productos que registró<br></br>
    en el mismo, también le permitirá realizar<br></br> 
    la eliminación de los mismos.
    </div>
);

const textoCardRegistrarCompra = (
    <div align='center'>En esta sección podrá registrar una compra;<br></br>
    es decir, si desea incrementar la cantidad de un<br></br>
    producto que ya está registrado en su Inventario<br></br> 
    podrá hacerlo a través de un formulario, para<br></br>
    insertar los productos a comprar en una tabla<br></br>
    Detalle de Compra, una vez revisada la misma <br></br>
    podrá confirmar y guardar en el registro de <br></br>
    compras a través del botón registrar.</div>
);

const textoCardMostrarCompras = (
    <div align='center'>En esta sección podrá ver las compras<br></br>
    realizadas, mismas que fueron registradas <br></br>
    anteriormente en la sección "Registrar<br></br>
    Compra", así tendrá una tabla con las<br></br>
    compras realizadas, su código de compra<br></br>
    y producto, nombre, precio, cantidad<br></br>
    y fecha de compra.
    </div>
);



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
                        <Popover content={textoCardRegistrarProducto} trigger="hover">
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
                        <Popover content={textoCardMostrarInventario} trigger="hover">
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
                        <Popover content={textoCardRegistrarCompra} trigger="hover">
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
                        <Popover content={textoCardMostrarCompras} trigger="hover">
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
