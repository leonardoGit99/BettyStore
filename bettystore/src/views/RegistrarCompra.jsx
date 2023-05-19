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
    { title: 'Precio (Bs.)', dataIndex: 'precio', key: 'precio' },
    { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad' },
    { title: 'Fecha de compra', dataIndex: 'fecha', key: 'fecha' },
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
      message.error("Producto ya existente en el detalle de compras", 2.5);
    } else if (productoExistenteC2) {
      message.error("Producto ya existente en el detalle de compras", 2.5);
    } else if (codigoDeCompraExistente) {
      message.error("Código de compra existente en el detalle de compras", 2.5);
    }
    else if (nuevoProducto.nombre == undefined) {
      message.error("El producto seleccionado no existe en inventario", 2.5);
    }
    else {

      const datos = new FormData(); 
      datos.append("codigoCompra", nuevoProducto.codigoCompra);

      axios.post("http://localhost/IndexConsultasSegundoSprint/indexVerificarCodCompra.php/?verificarcodcompra=1", datos)
      .then(response => {

        if(response.data === "Disponible"){

          setComprasTotales([...comprasTotales, nuevoProducto]);
          form.resetFields();
          cerrarModal();

        }else{
          message.error("El código de compra ya esta registrado");
        }

      })

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
    await axios.post('http://localhost/IndexConsultasSegundoSprint/indexInsertarDetalleCompra.php/?insertarCompra=', comprasTotales)
      .then(response => {
        // Si la respuesta es exitosa, se limpia el detalle de compras
        setComprasTotales([]);
        message.info("¡Compra exitosa!", 2.5);
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
          <h2>Registrar Compra</h2>
        </Col>
        <Col lg={2} md={2}></Col>
      </Row>

      {/*Fila para el Modal y el formulario de registro*/}
      <Row>
        <Modal
          title={<div className="tituloModalRegistrarCompraVenta">Por favor, agrega un producto al detalle de compra</div>}
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
                    <Form.Item label="Fecha de Compra" labelAlign="left" name="fecha"
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
                        maxLength={4} placeholder="Ingrese la cantidad a comprar"/>
                    </Form.Item>
                  </Col>

                  <Col span={24}>
                    <Form.Item label="Código Compra" labelAlign="left" name="codigoCompra"
                      rules={[{
                        required: true,
                        message: "Por favor, ingrese un código",
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
                        maxLength={4} placeholder="Ingrese el código de compra"/>
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
        <Col lg={20} md={20} xs={24} className="componentsContainerDetCompraVenta">
          <Col lg={2} md={2}></Col>
          <Col lg={20} md={20}>
            <Button type="primary" onClick={mostrarModal} icon={<ShoppingOutlined />}>Agregar Producto</Button>
          </Col>
          <Col lg={2} md={2}></Col>

          {/* Tabla detalle de compras */}
          <h2 className='subtituloTablaDetalleCompraVenta'>Detalle de compra</h2>
          <Table className='tablaDetalleCompraVenta' rowKey="nombre" dataSource={comprasTotales} columns={columnasTablaDetalleCompras} locale={{ emptyText: 'No hay compras' }} bordered={true} pagination={{ pageSize: 3, pagination: true, position: ["bottomRight"] }} size={'small'} />
          {comprasTotales.length > 0 && (
            <Button type="primary" onClick={confirmarCompra} icon={<CheckCircleOutlined />}>
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