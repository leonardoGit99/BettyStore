import React, { useState, useEffect, useRef } from "react";
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
    let productoExistenteC1 = false;
    let productoExistenteC2 = false;
    let codigoDeCompraExistente = false;
    for (let i = 0; i < comprasTotales.length; i++) {
      //Nombre del producto y el codigo de compras ya esta en tabla detalle de compras                    
      if ((comprasTotales[i].codProd === nuevoProducto.codProd && comprasTotales[i].codigoCompra === nuevoProducto.codigoCompra)) {
        productoExistenteC1 = true;
        break;
        // Nombre de producto ya esta en tabla detalle de compras y codigo de compra es diferente al del detalle de compras
      } else if ((comprasTotales[i].codProd === nuevoProducto.codProd && comprasTotales[i].codigoCompra !== nuevoProducto.codigoCompra)) {
        productoExistenteC2 = true;
        break;
        // Nombre diferente al detalle de compras y codigo de compras que ya esta en el detalle de compras
      } else if ((comprasTotales[i].codProd !== nuevoProducto.codProd && comprasTotales[i].codigoCompra === nuevoProducto.codigoCompra)) {
        codigoDeCompraExistente = true;
        break;
      }
    }
    if (productoExistenteC1) {
      message.error("Producto existente en el detalle de compras", 2.5);
    } else if (productoExistenteC2) {
      message.error("Producto existente en el detalle de compras", 2.5);
    } else if (codigoDeCompraExistente) {
      message.error("Código de compra existente en el detalle de compras", 2.5);
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
      //onCancel:borrarCampos(),
      onOk: ()=>{
        const productoAEliminarDelDetalleCompra = comprasTotales.filter((product) => product.nombre !== key);
        setComprasTotales(productoAEliminarDelDetalleCompra);
        message.info('Esta compra ha sido eliminada exitosamente del detalle de compra', 2);
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
    borrarCampos();
  }

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 18
    }
  };

  //Borrar los campos del formulario de reg. Compras
  const formRefRegComp = useRef(null);
  const borrarCampos = () => {
    formRefRegComp.current?.resetFields();
  }

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
          destroyOnClose='true'
        >
          {/*<Layout></Layout>*/}
          {/*Contenedor general*/}
          <Col lg={24} md={24} xs={24} className="componentsContainer">
            <Row>
              <Col lg={0} md={0} xs={1}></Col>
              {/*Columna para todo el formulario*/}
              <Col lg={24} md={24} xs={22}>
                <Form {...layout} form={form} ref={formRefRegComp} onFinish={agregarAlDetalleDeCompras} layout="horizontal">
                  <Row>
                    <Col lg={0} md={0} xs={1}></Col>
                    <Col lg={22} md={22} xs={23}>

                      {/* Buscador de inventario */}
                      <Form.Item name="buscador" rules={[{ required: true, message: "Por favor, seleccione un producto del inventario" }]}>
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