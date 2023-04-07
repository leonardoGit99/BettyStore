import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from "axios";
//import ErrorList from 'antd/es/form/ErrorList';
import { DeleteOutlined } from '@ant-design/icons'
import './TablaInventarioStyle.css';


function TablaInventario(props) {

  //const [data, setData] = useState([]);
  const peticionUrl = "http://localhost:8012/crudProductos/indexConsultaGeneral.php";
  //esto quitar puerto 8012 si esta por defecto en el 80 


  const [modalEliminar, setModalEliminar] = useState(false);

  //Accion de abrir y cerrar modal de eliminacion
  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const columnas = [
    {
      title: "Codigo",
      dataIndex: "codProd",
      key: "codProd",
    },
    {
      title: "Nombre",
      dataIndex: "nomProd",
      key: "nomProd",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcionProd",
      key: "descripcionProd",
    },
    {
      title: "Categoria",
      dataIndex: "categoriaProd",
      key: "categoriaProd",
    },
    {
      title: "Precio (Bs)",
      dataIndex: "precioProd",
      key: "precioProd",
    },
    {
      title: "Cantidad",
      dataIndex: "cantidadProd",
      key: "cantidadProd",
    },
    {
      title: "Imagen",
      dataIndex: "imagenProd",
      key: "imagenProd",
    },
    {
      title: "Fecha",
      dataIndex: "fechaProd",
      key: "fechaProd",
    },
    {
      title: "Opciones",
      key: "opciones",
      render: (fila) => (<Button className='btnEliminar' type='primary' danger onClick={abrirCerrarModalEliminar} icon={<DeleteOutlined />}></Button>),
    },
  ];
  /*
    const data=[
      {
        key: '1', 
        codigo: '1234567891011',
        nombre: "Coca Cola",
        descripcion: "Coca-Cola es una bebida azucarada gaseosa vendida a nivel mundial en tiendas, restaurantes y máquinas expendedoras en más de doscientos países o territorios",
        categoria: "Aguas y bebidas",
        precio: "13",
        cantidad: "24",
        imagen: "X img preview",
        fecha: "DD/AA/MM",
      },
      {
        key: '2', 
        codigo: '1286869891011',
        nombre: "Leche Pil 1L",
        descripcion: "Es un producto elaborado a partir de leche seleccionada y controlada, la cual es higienizada, estandarizada al 3,0% de materia grasa, homogenizada y ultrapasteurizada (UHT)",
        categoria: "Lacteos",
        precio: "6",
        cantidad: "57",
        imagen: "X img preview",
        fecha: "DD/AA/MM",
      },
      {
        key: '3', 
        codigo: '7878767891011',
        nombre: "Bacardi Manzana",
        descripcion: "Ron blanco con sabor a manzana verde Granny Smith, Golden Delicious y Fuji. De sabor refrescante y suavemente cítrico, idealmente para mezclar con bebida tipo ginger ale o refrescos de limón.",
        categoria: "Licoreria",
        precio: "80",
        cantidad: "7",
        imagen:  "X preview",
        fecha: "DD/AA/MM",
      },
      {
        key: '4', 
        codigo: '7878767891011',
        nombre: "Bacardi Manzana",
        descripcion: "Ron blanco con sabor a manzana verde Granny Smith, Golden Delicious y Fuji. De sabor refrescante y suavemente cítrico, idealmente para mezclar con bebida tipo ginger ale o refrescos de limón.",
        categoria: "Licoreria",
        precio: "80",
        cantidad: "7",
        imagen:  "X preview",
        fecha: "DD/AA/MM",
      },
      {
        key: '5', 
        codigo: '7878767891011',
        nombre: "Bacardi Manzana",
        descripcion: "Ron blanco con sabor a manzana verde Granny Smith, Golden Delicious y Fuji. De sabor refrescante y suavemente cítrico, idealmente para mezclar con bebida tipo ginger ale o refrescos de limón.",
        categoria: "Licoreria",
        precio: "80",
        cantidad: "7",
        imagen:  "X preview",
        fecha: "DD/AA/MM",
      },
      {
        key: '6', 
        codigo: '7878767891011',
        nombre: "Bacardi Manzana",
        descripcion: "Ron blanco con sabor a manzana verde Granny Smith, Golden Delicious y Fuji. De sabor refrescante y suavemente cítrico, idealmente para mezclar con bebida tipo ginger ale o refrescos de limón.",
        categoria: "Licoreria",
        precio: "80",
        cantidad: "7",
        imagen:  "X preview",
        fecha: "DD/AA/MM",
      },
    ];
  */

  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get(peticionUrl)
      .then(response => {
        props.setDatosTabla(response.data.list);
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(() => {
    peticionGet();
  }, [])

  //  Peticion delete a la API usando axios.

  const peticionDelete = async () => {
    await axios.delete(peticionUrl + "/" + props.producto.id)
      .then(response => {
        props.setDatosTabla(props.datosTabla.filter(elemento => elemento.id !== props.producto.id));
        infoEliminado();
      }).catch(error => {
        console.log(error);
      })
  }


  const infoEliminado = () => {
    message.info('Este producto ha sido eliminado exitosamente');
    abrirCerrarModalEliminar()
  };

  return (
    <div className='mostrarInventario'>
      <h2 className='subtituloTabla'>Productos Registrados en Inventario</h2>
      {/* TablaDinamica */}
      <Table className='tabla' rowKey='id' columns={columnas} dataSource={props.datosTabla} bordered={true} pagination={{ pageSize: 5, pagination: true, position: ["bottomCenter"] }} size={'small'} />\

      {/* TablaEstatica */}
      {/* <Table className='tabla'columns={columnas} dataSource={data} bordered={true} pagination={{pageSize: 5, pagination: true, position: ["bottomRight"]}}  size={'small'}/> */}

      <Modal
        open={modalEliminar}
        onCancel={abrirCerrarModalEliminar}
        centered
        footer={[
          <Button type="primary" danger onClick={peticionDelete} >Aceptar</Button>,
          <Button type='primary' onClick={abrirCerrarModalEliminar}>Cancelar</Button>,
        ]}>
        ¿Está seguro que desea <b>eliminar</b> el producto del inventario?
      </Modal>
    </div>
  );
}

export default TablaInventario;