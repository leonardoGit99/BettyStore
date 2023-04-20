import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, message, Layout } from "antd";
import dayjs from "dayjs";
import { ShoppingCartOutlined } from '@ant-design/icons'
import TablaDetalleCompras from "../components/TablaDetalleCompras/TablaDetalleCompras";

//Valor de fecha seleccionada
const handleChangeDate = (value) => {
    const date = dayjs(value).format(dateFormatList[0]);
    console.log(value);
    /*producto['fechaProd'] = date;*/
}

//Bloquear fechas menores a la actual
const disabledDate = (current) => {
    // Can not select days before today and today

    return current && current < dayjs();
};

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const { Item } = Form;

export default function RegistrarCompra() {
    return (
        <div>
            <Row>
                <h1>Registrar Compra</h1>
            </Row>
            <Row>
                {/*<Layout></Layout>*/}
                <Col lg={2}></Col>
                <Col lg={20} className="componentsContainer">
                    <Row>
                        <Input
                            className="entradaBuscador"
                            name="buscador"
                            placeholder="Busque un producto en el Inventario"
                            maxLength={10}
                        />
                    </Row>

                    <p></p> {/* Esto estaría bien así o manejarlo como una Row*/}
                    <Row>
                        <Col lg={12}>
                            <Item
                                label="Producto Seleccionado: "
                            >
                                <Input
                                    label="Producto seleccionado"
                                    className="selección"
                                    name="selección"
                                    placeholder="Ningún producto seleccionado"
                                    maxLength={10}
                                />
                            </Item>
                        </Col>
                        <Col lg={2}></Col>
                        <Col lg={6} >
                            <Item
                                label="Fecha de Compra"
                                name="fechaCompra"
                                rules={[{
                                    required: true,
                                    message: "Por favor, seleccione una fecha",
                                },]}
                            >
                                <DatePicker name="fechaProd"
                                    placeholder="DD/MM/AAAA"
                                    disabledDate={disabledDate}
                                    format={dateFormatList}
                                    onChange={handleChangeDate} />
                            </Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={8}>
                            <Item
                                label="Cantidad: "
                            >
                                <Input
                                    className="cantidadProducto"
                                    name="cantProd"
                                    placeholder="#"
                                    maxLength={3}
                                />
                            </Item>
                        </Col>
                        <Col lg={2}></Col>
                        <Col lg={6} >
                            <Button
                                icon={<ShoppingCartOutlined />} >Agregar
                            </Button>
                        </Col>
                    </Row>
                </Col>
                <Col lg={2}></Col>
            </Row>
            <Row>
                {/*<Layout></Layout>*/}
                <Col lg={2}></Col>
                <Col lg={20} className="componentsContainer">
                    {/* <Input className="entradaBuscador"
                        name="buscador"
                        placeholder="Aquí vendría el detalle de compra"
                        maxLength={10}
                    /> */}
                    <TablaDetalleCompras/>
                </Col>
                <Col lg={2}></Col>
            </Row>


        </div>
    )

}