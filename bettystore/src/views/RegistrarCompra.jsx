import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, DatePicker, Table, AutoComplete, message, Modal } from "antd";
import dayjs from "dayjs";
import { ShoppingCartOutlined } from '@ant-design/icons'
import { DeleteOutlined } from '@ant-design/icons';
import axios from "axios";
import Footer from "../components/Footer/Footer";
import '../App.css';

export default function RegistrarCompra() {
  const [form] = Form.useForm();
  const [comprasTotales, setComprasTotales] = useState([]);
  console.log(comprasTotales);

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
    setProductos(filtrado);
  }

  function filtrarOpciones(busqueda, producto) {
    return producto.nomProd.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1;
  }



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

  //COMPONENTE TABLA DETALLE DE COMPRAS
  //Tabla detalle de compras pruebas
  const columnasTablaDetalleCompras = [
    { title: 'Código compra', dataIndex: 'codigoCompra', key: 'codigoCompra' },
    { title: 'Código producto', dataIndex: 'codProd', key: 'codProd' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Precio', dataIndex: 'precio', key: 'precio' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' },
    {
      title: 'Opciones',
      dataIndex: 'opciones',
      key: 'opciones',
      render: (_, fila) => (
        <Button type="primary" danger onClick={() => eliminarProductoDetalleCompras(fila.codigoCompra)} icon={<DeleteOutlined />} />
      ),
    },
  ];

  //FUNCIONES PARA INSERTAR DATOS EN TABLA DETALLE DE COMPRAS
  const agregarAlDetalleDeCompras = (producto) => {
    const nuevoProducto = {
      codigoCompra: producto.codigoCompra,
      codProd: seleccionado.codProd,
      nombre: seleccionado.value,
      precio: seleccionado.precioProd,
      cantidad: producto.cantidad,
      fecha: producto.fecha.format('YYYY-MM-DD'),
    };
    setComprasTotales([...comprasTotales, nuevoProducto]);
    form.resetFields();
    cerrarModal();
  };

  const eliminarProductoDetalleCompras = (key) => {
    const productoAEliminarDelDetalleCompra = comprasTotales.filter((product) => product.codigoCompra !== key);
    setComprasTotales(productoAEliminarDelDetalleCompra);
  };


  //Modal
  const [modalEsVisible, setModalEsVisible] = useState(false);

  const mostrarModal = () => {
    setModalEsVisible(true);
  }

  const cerrarModal = () => {
    setModalEsVisible(false);
  }

  return (
    <div>
      <Row>
        <Col lg={2}></Col>
        <Col lg={20}>
          <h1>Registrar Compra</h1>
        </Col>
        <Col lg={2}></Col>
      </Row>
      <Row>
        <Modal
          title="Agrega un Producto al detalle de compras"
          open={modalEsVisible}
          onCancel={cerrarModal}
          footer={null}
          width={1270}
        >
          {/*<Layout></Layout>*/}
          <Col lg={2} xs={2}></Col>
          <Col lg={20} xs={20} className="componentsContainer">
            <Row>
              <Col lg={1}></Col>
              <Col lg={10}>

                {/* Buscador de inventario */}
                <AutoComplete
                  style={{ width: 750 }}
                  options={productos.map((producto) => ({ value: producto.nomProd, cantidadProd: producto.cantidadProd, precioProd: producto.precioProd, codProd: producto.codProd }))}
                  onSelect={handleSelect}
                  placeholder="Busque un producto del inventario"
                  onSearch={handleSearch}
                >
                  <Input
                    size="large"
                  />
                </AutoComplete>
                {/* Boton para mostrar el producto seleccionado por consola */}
                {/*<Button onClick={mostrarSeleccionado}>Mostrar seleccionado por consola</Button>*/}
              </Col>
            </Row>
            <p></p> {/* Esto estaría bien así o manejarlo como una Row*/}
            <Row>
              <Col span={1}></Col>
              {/*Columna para todo el formulario*/}
              <Col span={22}>
                <Form form={form} onFinish={agregarAlDetalleDeCompras} layout="inline">
                  <Col lg={10}>
                    <Form.Item label="Producto Seleccionado: ">
                      <Input
                        style={{ color: "#676767" }}
                        disabled
                        placeholder="Ningun producto seleccionado"
                        value={seleccionado.value}
                        name="nombre"
                        rules={[{ required: true }]}
                      >

                      </Input>
                    </Form.Item>
                  </Col>
                  <Col lg={1}></Col>
                  <Col lg={6}>
                    <Form.Item label="Fecha" name="fecha" rules={[{ required: true }]}>
                      <DatePicker format="YYYY-MM-DD" />
                    </Form.Item>
                  </Col>

                  <Col lg={6}>
                    <Form.Item label="Cantidad" name="cantidad" rules={[{ required: true }]}>
                      <Col lg={10}>
                        <Input type="number" min="0" step="1" />
                      </Col>
                    </Form.Item>
                  </Col>

                  <Col lg={6}>
                    <Form.Item label="Código Compra" name="codigoCompra" rules={[{ required: true }]}>
                      <Col lg={10}>
                        <Input />
                      </Col>
                    </Form.Item>
                  </Col>
                  <Col lg={6}>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Agregar
                      </Button>
                    </Form.Item>
                  </Col>
                </Form>
              </Col>
              <Col span={1}></Col>
            </Row>
          </Col>
          <Col lg={2}></Col>
        </Modal>
      </Row>

      <Row>
        {/*<Layout></Layout>*/}
        <Col lg={2}></Col>
        <Col lg={20} xs={24} className="componentsContainer">
          <Col lg={2}></Col>
          <Col lg={20}>
            <Button type="primary" onClick={mostrarModal}>Agregar Producto</Button>
          </Col>
          <Col lg={2}></Col>

          {/* Tabla detalle de compras */}
          <h2 className='subtituloTablaDetalleCompras'>Detalle de compra</h2>
          <Table className='tabla' rowKey="codigoCompra" dataSource={comprasTotales} columns={columnasTablaDetalleCompras} locale={{ emptyText: 'No hay compras' }} bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'} />
          {comprasTotales.length > 0 && (
            <Button type="primary">
              Registrar
            </Button>
          )}
        </Col>
        <Col lg={2}></Col>
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