//import { Link } from "react-router-dom"
import { Row, Col, Card, Popover } from 'antd'
import { useNavigate } from "react-router-dom";
//import SignIn from '../components/SignIn'
import Footer from "../components/Footer/Footer";


export default function HomeVendedor() {
    const navigate = useNavigate();

    function redireccionarRegistrarVenta() {
        navigate("/registrarVenta");
    }

    function redireccionarMostrarVenta() {
        navigate("/mostrarVenta");
    }

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
                <Col lg={7} xs={5}></Col>
                <Col lg={10} xs={14}>
                    <div>
                        <h1 lg={24} md={24} xs={24} className='tituloHome'>BettyStore</h1>
                    </div>
                </Col>
                <Col lg={7} xs={5}></Col>
            </Row>
            <Row>
                <Col span={0} lg={24}>
                    <p></p>
                </Col>
                <Col span={0} lg={24}>
                    <p></p>
                </Col>

            </Row>
            <Row>
                {/*<Row gutter={{ xs: 12, sm: 24, md: 24, lg: 38, xl: 40 }}>*/}
                <Col lg={6} md={2} xs={2}></Col>
                <Col lg={5} span={9}>
                    <p></p>
                    <Card className='cardStyleVenta'
                        title="Venta"
                        bordered={false}
                        hoverable
                        onClick={() => redireccionarRegistrarVenta()}
                        cover={<img className="imgVendedor" alt='ImgRegProd' src='./assets/Ventas-1.png'></img>}
                    >
                        <Popover className='textoCard' content={textoCardRegistrarVenta} trigger="hover">
                            Registrar Venta
                        </Popover>
                    </Card>
                </Col>
                <Col lg={2} span={2}></Col>
                <Col lg={5} span={9}>
                    <p></p>
                    <Card className='cardStyleVenta'
                        title="Venta"
                        bordered={false}
                        hoverable
                        onClick={() => redireccionarMostrarVenta()}
                        cover={<img className="imgVendedor" alt='ImgRegProd' src='./assets/Ventas-2.png'></img>}
                    >
                        <Popover className='textoCard' content={textoCardMostrarVentas} trigger="hover">
                            Mostrar Ventas
                        </Popover>
                    </Card>
                </Col>
                <Col lg={6} span={2}></Col>
                {/*</Row>*/}

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
