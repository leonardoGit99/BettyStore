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
      borrarCampos();
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
    {
      title: 'Opciones',
      dataIndex: 'opciones',
      key: 'opciones',
      render: (_, fila) => (
        <Button type="primary" danger onClick={() => eliminarProductoDetalleVentas(fila.nombre)} icon={<DeleteOutlined />} />
      ),
    },
  ];

  //Funcion para convertir la cantidad que esta en formato de cadena a un numero entero.
  const convertirCantStringAInt = (cantidadString) =>{
    const cantidadInt = parseInt(cantidadString, 10);
    return cantidadInt;
  }

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
    // Control de producto existente en detalle de ventas
    let productoExistenteC1 = false;
    let productoExistenteC2 = false;
    let codigoDeVentaExistente = false;
    for (let i = 0; i < ventasTotales.length; i++) {
      //Nombre del producto y el codigo de venta ya esta en tabla detalle de ventas                    
      if ((ventasTotales[i].codProd === nuevoProducto.codProd && ventasTotales[i].codigoVenta === nuevoProducto.codigoVenta)) {
        productoExistenteC1 = true;
        break;
        // Nombre de producto ya esta en tabla detalle de ventas y codigo de ventas es diferente al del detalle de ventas
      } else if ((ventasTotales[i].codProd === nuevoProducto.codProd && ventasTotales[i].codigoVenta !== nuevoProducto.codigoVenta)) {
        productoExistenteC2 = true;
        break;
        // Nombre diferente al detalle de ventas y codigo de ventas que ya esta en el detalle de ventas
      } else if ((ventasTotales[i].codProd !== nuevoProducto.codProd && ventasTotales[i].codigoVenta === nuevoProducto.codigoVenta)) {
        codigoDeVentaExistente = true;
        break;
      }
    }
    if (productoExistenteC1) {
      message.error("Producto ya existente en el detalle de ventas", 2.5);
    } else if (productoExistenteC2) {
      message.error("Producto ya existente en el detalle de ventas", 2.5);
    } else if (codigoDeVentaExistente) {
      message.error("Código de venta existente en el detalle de ventas", 2.5);
    }
    else if (nuevoProducto.nombre === undefined) {
      message.error("El producto seleccionado no existe en inventario", 2.5);
    }
    else if(convertirCantStringAInt(nuevoProducto.cantidad) > convertirCantStringAInt(seleccionado.cantidadProd)  ){
      message.error("Cantidad del producto '" + seleccionado.value + "' no disponible para la venta", 2.5);
    }
    else{
    /*
    else {

      const datos = new FormData();
      datos.append("codigoVenta", nuevoProducto.codigoVenta);

      axios.post("http://localhost/IndexConsultasSegundoSprint/indexVerificarCodCompra.php/?verificarcodcompra=1", datos)
        .then(response => {

          if (response.data === "Disponible") {

            setVentasTotales([...ventasTotales, nuevoProducto]);
            form.resetFields();
            cerrarModal();

          } else {
            message.error("El código de venta ya esta registrado");
          }

        })

    }
    */
    /*Borrar estas tres lineas y descomentar peticion post*/
    setVentasTotales([...ventasTotales, nuevoProducto]);
    message.info("Quedan " + (seleccionado.cantidadProd-nuevoProducto.cantidad)  + " (unidades) del producto " + seleccionado.value );
    form.resetFields();
    cerrarModal();
    }
  };

  const eliminarProductoDetalleVentas = (key) => {
    Modal.confirm({
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okType: 'danger',
      title: '¿Está seguro que desea eliminar el producto ' + key + ' del detalle de venta?',
      maskClosable: 'true',
      onOk: () => {
        const productoAEliminarDelDetalleVenta = ventasTotales.filter((product) => product.nombre !== key);
        setVentasTotales(productoAEliminarDelDetalleVenta);
        message.info('Esta venta ha sido eliminada exitosamente del detalle de venta', 2.5);
      }
    })
  };

  //BOTON QUE ENVIA A B.D. infomarción de la Tabla Detalle de venta
  const confirmarVenta = async () => {
    // Verifica que haya al menos un producto en el detalle de venta
    if (ventasTotales.length === 0) {
      message.warning('Agrega productos al detalle de venta primero');
      return;
    }
    //Petición Post botón registrar, para pasar datosInventario de tabla detalle de venta a tabla ventas.
    // Envia los productos al servidor
    await axios.post('http://localhost/IndexConsultasTercerSprint/indexInsertarDetalleVenta.php/?insertarVenta=', ventasTotales)
      .then(response => {
        // Si la respuesta es exitosa, se limpia el detalle de ventas
        setVentasTotales([]);
        message.info("¡Venta exitosa!", 2.5);
        peticionGet();
      })
      .catch(error => {
        message.error('Lo sentimos, algo salió mal');
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
    setSeleccionado("");
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
          title={<div className="tituloModalRegistrarCompraVenta">Por favor, agrega un producto al detalle de venta</div>}
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
                      <Form.Item className="barraBusquedaInvParaComprasVentas" name="buscador" rules={[{ required: true, message: "Por favor, seleccione un producto del inventario" }]}>
                        <AutoComplete
                          /*style={{ width: 500 }}*/
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
        <Col lg={20} md={20} xs={24} className="componentsContainerDetCompraVenta">
          <Col lg={2} md={2}></Col>
          <Col lg={20} md={20}>
            <Button type="primary" onClick={mostrarModal} icon={<ShoppingOutlined />}>Agregar Producto</Button>
          </Col>
          <Col lg={2} md={2}></Col>

          {/* Tabla detalle de ventas */}
          <h2 className='subtituloTablaDetalleCompraVenta'>Detalle de venta</h2>
          <Table className='tablaDetalleCompraVenta' rowKey="nombre" dataSource={ventasTotales} columns={columnasTablaDetalleVentas} locale={{ emptyText: 'No hay ventas' }} bordered={true} pagination={{ pageSize: 3, pagination: true, position: ["bottomRight"] }} size={'small'} />
          {ventasTotales.length > 0 && (
            <Button type="primary" onClick={confirmarVenta} icon={<CheckCircleOutlined />}>
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