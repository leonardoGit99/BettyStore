import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Col, Row, DatePicker, Table, AutoComplete, message, Modal, Space } from "antd";
import dayjs from "dayjs";
import { ShoppingCartOutlined, ShoppingOutlined } from '@ant-design/icons'
import { DeleteOutlined, SearchOutlined, CheckCircleOutlined } from '@ant-design/icons';
import axios from "axios";
import Footer from "../components/Footer/Footer";
import '../App.css';
import 'dayjs/locale/es';
dayjs.locale('es');

export default function RegistrarVenta() {
  const [form] = Form.useForm();
  const [ventasTotales, setVentasTotales] = useState([]);
  console.log(ventasTotales);

  //COMPONENTE BUSCADOR

  const [productos, setProductos] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [datosInventario, setDatosInventario] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [seleccionado, setSeleccionado] = useState({});

  const peticionGet = async () => {
    await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaSimple.php")
      .then(response => {
        setProductos(response.data);
        setDatosInventario(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionGet();
  }, [])

  function handleSelect(selectedValue, selectedOption) {
    setSeleccionado(selectedOption);
  }

  function handleSearch(busqueda) {
    const filtrado = datosInventario.filter((producto) =>
      filtrarOpciones(busqueda, producto)
    );

    if (filtrado.length >= 1) {
      setProductos(filtrado);
    } else {
      setProductos(filtrado);
      message.warning("Producto no disponible", 2);
    }

  }

  function filtrarOpciones(busqueda, producto) {
    return producto.nomProd.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1;
  }


  //Valor de fecha seleccionada
  const handleChangeDate = (value) => {
    const date = dayjs(value).format(dateFormatList[0]);
    console.log(value);
  }

  //Bloquear fechas menores a la actual
  const disabledDate = (current) => {
    // Can not select days before today and today

    return current && current < dayjs().subtract(1, 'day').endOf('day');
  };

  const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

  //COMPONENTE TABLA DETALLE DE VENTAS
  const columnasTablaDetalleVentas = [
    { title: 'Código de venta', dataIndex: 'codigoVenta', key: 'codigoVenta' },
    { title: 'Código de producto', dataIndex: 'codProd', key: 'codProd' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Precio (Bs.)', dataIndex: 'precio', key: 'precio' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Fecha de venta', dataIndex: 'fecha', key: 'fecha' },
  ];

  //FUNCIONES PARA INSERTAR DATOS EN TABLA DETALLE DE VENTAS
  const agregarAlDetalleDeVentas = (producto) => {
    const nuevoProducto = {
      codigoVenta: producto.codigoVenta,
      codProd: seleccionado.codProd,
      nombre: seleccionado.value,
      precio: seleccionado.precioProd,
      cantidad: producto.cantidad,
      fecha: producto.fecha.format(dateFormatList[0]),
    };

    setVentasTotales([...ventasTotales, nuevoProducto]);
    cerrarModal();
  };


  //Modal
  const [modalEsVisible, setModalEsVisible] = useState(false);

  const mostrarModal = () => {
    setModalEsVisible(true);
  }

  const cerrarModal = () => {
    setModalEsVisible(false);
  }

  const layout = {
    //etiquetas del formulario
    labelCol: {
      span: 8
    },
    //items del formulario
    wrapperCol: {
      span: 18
    }
  };

  //Borrar los campos del formulario del registro de venta
  const formRefRegVent = useRef(null);
  const borrarCampos = () => {
    formRefRegVent.current?.resetFields();
  }


  return (
    <div>
      <Row>
        <Col lg={2} md={2} xs={0}></Col>
        <Col lg={20} md={20} xs={24}>
          <h2>Registrar Venta</h2>
        </Col>
        <Col lg={2} md={2}></Col>
      </Row>

      <Row>
        <Modal
          title={<div className="tituloModalRegistrarCompra">Por favor, agrega un producto al detalle de venta</div>}
          open={modalEsVisible}
          onCancel={cerrarModal}
          footer={null}
          width={600}
          destroyOnClose='true'
        >
          <Col lg={24} md={24} xs={24} className="componentsContainer">
            <Row>
              <Col lg={0} md={0} xs={1}></Col>
              {/*Columna para todo el formulario*/}
              <Col lg={24} md={24} xs={22}>
                <Form {...layout} form={form} ref={formRefRegVent} onFinish={agregarAlDetalleDeVentas} layout="horizontal">
                  <Row>
                    <Col lg={0} md={0} xs={1}></Col>
                    <Col lg={22} md={22} xs={23}>

                      {/* Buscador de inventario */}
                      <Form.Item className="buscador" name="buscador" rules={[{ required: true, message: "Por favor, seleccione un producto del inventario" }]}>
                        <AutoComplete
                          /*style={{ width: 500 }}*/
                          options={productos.map((producto) => ({ value: producto.nomProd, cantidadProd: producto.cantidadProd, precioProd: producto.precioProd, codProd: producto.codProd }))}
                          onSelect={handleSelect}
                          placeholder="Busque un producto del inventario"
                          onSearch={handleSearch}
                        >
                          <Input
                            size="large"

                          />
                        </AutoComplete>
                      </Form.Item>
                    </Col>
                    <Col lg={0}></Col>
                  </Row>
                  <Col span={24}>
                    <Form.Item label="Producto Seleccionado: " labelAlign="left" name="buscador" rules={[{ required: true, message: "Por favor, seleccione un producto del inventario" }]}>
                      <Input
                        style={{ color: "#676767" }}
                        disabled
                        placeholder="Ningun producto seleccionado"
                        value={seleccionado.value}
                      >

                      </Input>
                    </Form.Item>
                  </Col>
                  {/*<Col lg={1}></Col>*/}
                  <Col span={24}>
                    <Form.Item label="Fecha de Venta" labelAlign="left" name="fecha"
                      rules={[{ required: true, message: "Por favor, seleccione una fecha", }]}>
                      <DatePicker placeholder="DD/MM/AAAA"
                        disabledDate={disabledDate}
                        locale={{ lang: { locale: 'es', ok: 'Aceptar', cancel: 'Cancelar' } }}
                        format={dateFormatList}
                        onChange={handleChangeDate} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Cantidad" labelAlign="left" name="cantidad"
                      rules={[{
                        required: true,
                        message: "Por favor, ingrese la cantidad.",
                      },
                      {
                        whitespace: true,
                        message: 'No puede dejar en blanco este campo',
                      },
                      {
                        validator: (_, value) =>
                          value && value.match('^0*[1-9][0-9]*$')
                            ? Promise.resolve()
                            : Promise.reject(new Error('Debe ingresar solo números y un valor mayor a cero')),
                      },
                      ]}>
                      <Input showCount
                        maxLength={4} />
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Código Venta" labelAlign="left" name="codigoVenta"
                      rules={[{
                        required: true,
                        message: "Por favor, ingrese el código de venta",
                      },
                      {
                        whitespace: true,
                        message: 'No puede dejar en blanco este campo',
                      },
                      {
                        validator: (_, value) =>
                          value && value.match('^0*[1-9][0-9]*$')
                            ? Promise.resolve()
                            : Promise.reject(new Error('Debe ingresar solo números y un valor mayor a cero')),
                      },
                      ]}
                    >
                      <Input showCount
                        maxLength={4} />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Agregar
                      </Button>
                    </Form.Item>
                  </Col>
                </Form>
              </Col>
              <Col xs={1}></Col>
            </Row>
          </Col>
        </Modal>
      </Row>

      <Row>
        <Col lg={2} md={2}></Col>
        <Col lg={20} md={20} xs={24} className="componentsContainerDetCompras">
          <Col lg={2} md={2}></Col>
          <Col lg={20} md={20}>
            <Button type="primary" onClick={mostrarModal}>Agregar Producto</Button>
          </Col>
          <Col lg={2} md={2}></Col>

          {/* Tabla detalle de ventas */}
          <h2 className='subtituloTablaDetalleCompras'>Detalle de venta</h2>
          <Table className='tabla' rowKey="nombre" dataSource={ventasTotales} columns={columnasTablaDetalleVentas} locale={{ emptyText: 'No hay ventas' }} bordered={true} pagination={{ pageSize: 3, pagination: true, position: ["bottomRight"] }} size={'small'} />
          {ventasTotales.length > 0 && (
            <Button type="primary">
              Registrar
            </Button>
          )}
        </Col>
        <Col lg={2} md={2}></Col>
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