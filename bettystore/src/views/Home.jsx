//import { Link } from "react-router-dom"
import { Row, Col, Card, Popover } from 'antd'
import { useNavigate } from "react-router-dom";
//import SignIn from '../components/SignIn'
import Footer from "../components/Footer/Footer";


export default function Home() {
    const navigate = useNavigate();

    function redireccionarRegistrarProducto() {
        navigate("/registrarProducto");
    }

    function redireccionarMostrarInventario() {
        navigate("/mostrarInventario");
    }

    function redireccionarRegistrarCompra() {
        navigate("/registrarCompra");
    }

    function redireccionarMostrarCompra() {
        navigate("/mostrarCompra");

    }

    function redireccionarRegistrarVenta() {
        navigate("/registrarVenta");
    }

    function redireccionarMostrarVenta() {
        navigate("/mostrarVenta");
    }

    const textoCardRegistrarProducto = (
        <div align='center'>En esta sección podrá registrar un nuevo<br></br>
            producto a través de un formulario que le <br></br>
            permitirá llenar datos del mismo.</div>
    );

    const textoCardMostrarInventario = (
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

    const textoCardRegistrarVenta = (
        <div align='center'>En esta sección podrá registrar una venta;<br></br>
            al momento de entregar un producto al cliente se<br></br>
            reducirá la cantidad del producto esto al confirmar<br></br>
            la venta (Registrar); sin embargo previamente podrá<br></br>
            insertar los productos a un detalle de venta, antes<br></br>
            de registrar la misma, por si el cliente desea añadir<br></br>
            o cambiar los productos que desea.</div>


    );

    const textoCardMostrarVentas = (
        <div align='center'>En esta sección podrá ver las ventas<br></br>
            realizadas, mismas que fueron registradas <br></br>
            anteriormente en la sección "Registrar<br></br>
            Venta", así tendrá una tabla con las<br></br>
            compras realizadas, su código de compra<br></br>
            y producto, nombre, precio, cantidad<br></br>
            y fecha de compra.</div>
    );
    return (
        <div>
            <Row>
                <Col lg={8} xs={5}></Col>
                <Col lg={8} xs={14}>
                    <div>
                        <h1 lg={24} md={24} xs={24} className='tituloHome'>BettyStore</h1>
                    </div>
                </Col>
                <Col lg={8} xs={5}></Col>
            </Row>
            <Row>
                <Row gutter={{ xs: 12, sm: 24, md: 24, lg: 38, xl: 40 }}>
                    <Col lg={0} md={2} xs={2}></Col>
                    <Col lg={4} span={10}>
                        <p></p>
                        <Card
                            className='cardStyleInventario'
                            title="Inventario"
                            bordered={false}
                            //Este on click intentando que a todo el card se le pueda dar click 
                            onClick={() => redireccionarRegistrarProducto()}
                            hoverable
                            cover={<img className="img" alt='ImgRegProd' src='./assets/Inventario-1.jpg'></img>}
                        >
                            <Popover className='textoCard' content={textoCardRegistrarProducto} trigger="hover">
                                Registrar Producto
                            </Popover>
                        </Card>
                    </Col>
                    <Col lg={4} span={10}>
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
                            <Popover className='textoCard' content={textoCardMostrarInventario} trigger="hover">
                                Mostrar Inventario
                            </Popover>
                        </Card>
                    </Col>

                    <Col lg={0} span={2}></Col>
                    <Col lg={0} span={2}></Col>

                    <Col lg={4} span={10}>
                        <p></p>
                        <Card className='cardStyleCompra'
                            title="Compra"
                            bordered={false}
                            hoverable
                            onClick={() => redireccionarRegistrarCompra()}
                            cover={<img className="img" alt='ImgRegProd' src='./assets/Compras-1.jpg'></img>}
                        >
                            <Popover className='textoCard' content={textoCardRegistrarCompra} trigger="hover">
                                Registrar Compra
                            </Popover>
                        </Card>
                    </Col>
                    <Col lg={4} span={10}>
                        <p></p>
                        <Card className='cardStyleCompra'
                            title="Compra"
                            bordered={false}
                            hoverable
                            onClick={() => redireccionarMostrarCompra()}
                            cover={<img className="img" alt='ImgRegProd' src='./assets/Compras-2.jpg'></img>}
                        >
                            <Popover className='textoCard' content={textoCardMostrarCompras} trigger="hover">
                                Mostrar Compras
                            </Popover>
                        </Card>
                    </Col>

                    <Col lg={0} span={2}></Col>
                    <Col lg={0} span={2}></Col>

                    <Col lg={4} span={10}>
                        <p></p>
                        <Card className='cardStyleVenta'
                            title="Venta"
                            bordered={false}
                            hoverable
                            onClick={() => redireccionarRegistrarVenta()}
                            cover={<img className="img" alt='ImgRegProd' src='./assets/Ventas-1.png'></img>}
                        >
                            <Popover className='textoCard' content={textoCardRegistrarVenta} trigger="hover">
                                Registrar Venta
                            </Popover>
                        </Card>
                    </Col>
                    <Col lg={4} span={10}>
                        <p></p>
                        <Card className='cardStyleVenta'
                            title="Venta"
                            bordered={false}
                            hoverable
                            onClick={() => redireccionarMostrarVenta()}
                            cover={<img className="img" alt='ImgRegProd' src='./assets/Ventas-2.png'></img>}
                        >
                            <Popover className='textoCard' content={textoCardMostrarVentas} trigger="hover">
                                Mostrar Ventas
                            </Popover>
                        </Card>
                    </Col>
                    <Col span={0}></Col>
                </Row>

            </Row>
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
