import React, { useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, DatePicker, Table, AutoComplete, message, Modal, Space } from "antd";
import dayjs from "dayjs";
import { ShoppingCartOutlined } from '@ant-design/icons'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import axios from "axios";
import Footer from "../components/Footer/Footer";
import '../App.css';
import 'dayjs/locale/es';
dayjs.locale('es');

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

    if (filtrado.length >= 1) {
      setProductos(filtrado);
    } else {
      setProductos(filtrado);
      message.info("No se encontraron productos.", 0.65);
    }

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

    return current && current < dayjs().subtract(1, 'day').endOf('day');
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
        <Button type="primary" danger onClick={() => eliminarProductoDetalleCompras(fila.nombre)} icon={<DeleteOutlined />} />
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
      fecha: producto.fecha.format(dateFormatList[0]),
    };
    // Control de producto existente en detalle de compras
    let productoExistente = false;
    for (let i = 0; i < comprasTotales.length; i++) {
      if ((comprasTotales[i].codProd === nuevoProducto.codProd && comprasTotales[i].codigoCompra === nuevoProducto.codigoCompra) || (comprasTotales[i].codProd === nuevoProducto.codProd && comprasTotales[i].codigoCompra !== nuevoProducto.codigoCompra) || (comprasTotales[i].codProd !== nuevoProducto.codProd && comprasTotales[i].codigoCompra === nuevoProducto.codigoCompra)) {
        productoExistente = true;
        break;
      }
    }
    if (productoExistente) {
      message.error("Producto existente en el detalle de compras");
    } else {
      setComprasTotales([...comprasTotales, nuevoProducto]);
      form.resetFields();
      cerrarModal();
    }
  };

  const eliminarProductoDetalleCompras = (key) => {
    Modal.confirm({
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okType: 'danger',
      //Arreglar bug de key cambiar por nombre de producto
      title: '¿Está seguro que desea eliminar el producto ' + key + ' del detalle de compra?',
      maskClosable: 'true',
      onOk: () => {
        const productoAEliminarDelDetalleCompra = comprasTotales.filter((product) => product.nombre !== key);
        setComprasTotales(productoAEliminarDelDetalleCompra);
      }
    })
  };

  //BOTON QUE ENVIA A B.D. infomarción de la Tabla Detalle de compra.
  const confirmarCompra = async () => {
    // Verifica que haya al menos un producto en el carrito
    if (comprasTotales.length === 0) {
      message.warning('Agrega productos al detalle de compras primero');
      return;
    }
    //Petición Post botón registrar, para pasar datosInventario de tabla detalle de compras a tabla compras.
    // Envia los productos al servidor
    await axios.post('url_del_servidor', comprasTotales)
      .then(response => {
        // Si la respuesta es exitosa, se limpia el detalle de compras
        setComprasTotales([]);
        message.success('Compra realizada con éxito');
      })
      .catch(error => {
        message.error('Hubo un error al procesar la compra');
        console.log(error);
      });
  }

  //Modal
  const [modalEsVisible, setModalEsVisible] = useState(false);

  const mostrarModal = () => {
    setModalEsVisible(true);
  }

  const cerrarModal = () => {
    setModalEsVisible(false);
  }

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 18
    }
  };

  return (
    <div>
      <Row>
        <Col lg={2} md={2} xs={0}></Col>
        <Col lg={20} md={20} xs={24}>
          <h1>Registrar Compra</h1>
        </Col>
        <Col lg={2} md={2}></Col>
      </Row>

      {/*Fila para el Modal y el formulario de registro*/}
      <Row>
        <Modal
          title="Agrega un Producto al detalle de compras"
          /*style={{textAlign:'center'}}*/
          open={modalEsVisible}
          onCancel={cerrarModal}
          footer={null}
          width={600}
        >
          {/*<Layout></Layout>*/}
          {/*Contenedor general*/}
          <Col lg={24} md={24} xs={24} className="componentsContainer">
            <Row>
              <Col lg={0} md={0} xs={1}></Col>
              <Col lg={22} md={22} xs={23}>

                {/* Buscador de inventario */}

                <AutoComplete
                  /*style={{ width: 500 }}*/
                  className="buscador"
                  options={productos.map((producto) => ({ value: producto.nomProd, cantidadProd: producto.cantidadProd, precioProd: producto.precioProd, codProd: producto.codProd }))}
                  onSelect={handleSelect}
                  placeholder="Busque un producto del inventario"
                  onSearch={handleSearch}
                >
                  <Input
                    size="large"
                    suffix={<SearchOutlined />}
                  />
                </AutoComplete>

                {/* Boton para mostrar el producto seleccionado por consola */}
                {/*<Button onClick={mostrarSeleccionado}>Mostrar seleccionado por consola</Button>*/}
              </Col>
              <Col lg={0}></Col>
            </Row>
            <p></p> {/* Esto estaría bien así o manejarlo como una Row*/}
            <Row>
              <Col lg={0} md={0} xs={1}></Col>
              {/*Columna para todo el formulario*/}
              <Col lg={24} md={24} xs={22}>
                <Form {...layout} form={form} onFinish={agregarAlDetalleDeCompras} layout="horizontal">
                  <Col span={24}>
                    <Form.Item label="Producto Seleccionado: " labelAlign="left"  /*name="Producto seleccionado"*/ rules={[{ required: true }]}>
                      <Input
                        style={{ color: "#676767" }}
                        disabled
                        placeholder="Ningun producto seleccionado"
                        value={seleccionado.value}
                        name="nombre"
                      >

                      </Input>
                    </Form.Item>
                  </Col>
                  {/*<Col lg={1}></Col>*/}
                  <Col span={24}>
                    <Form.Item label="Fecha" labelAlign="left" name="fecha"
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
                        message: "Por favor, seleccione una cantidad",
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
                    <Form.Item label="Código Compra" labelAlign="left" name="codigoCompra"
                      rules={[{
                        required: true,
                        message: "Por favor, ingrese un codigo",
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
          {/*<Col lg={2}></Col>*/}
        </Modal>
      </Row>

      <Row>
        {/*<Layout></Layout>*/}
        <Col lg={2} md={2}></Col>
        <Col lg={20} md={20} xs={24} className="componentsContainer">
          <Col lg={2} md={2}></Col>
          <Col lg={20} md={20}>
            <Button type="primary" onClick={mostrarModal}>Agregar Producto</Button>
          </Col>
          <Col lg={2} md={2}></Col>

          {/* Tabla detalle de compras */}
          <h2 className='subtituloTablaDetalleCompras'>Detalle de compra</h2>
          <Table className='tabla' rowKey="nombre" dataSource={comprasTotales} columns={columnasTablaDetalleCompras} locale={{ emptyText: 'No hay compras' }} bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'} />
          {comprasTotales.length > 0 && (
            <Button type="primary" onClick={confirmarCompra}>
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