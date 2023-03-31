import './TablaInventarioStyle.css';
import React, {useEffect, useState} from 'react';
import {Table, Button, Modal} from 'antd';
import axios from "axios";
//import ErrorList from 'antd/es/form/ErrorList';
import { DeleteOutlined  } from '@ant-design/icons'


function TablaInventario() {

  const [dinamicData, setData] = useState([]);
  const peticionUrl= "https://api.dailymotion.com/videos?channel=sport&limit=10";

  const [modalEliminar, setModalEliminar] = useState(false);

  const [modalConfirmar, setModalConfirmar] = useState(false);

  //Accion de abrir y cerrar modal de eliminacion
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  } 

  //Accion de abrir y cerrar modal de confirmacion
  const abrirCerrarModalConfirmar=()=>{
    setModalConfirmar(!modalConfirmar);
  } 

  const columnas= [
    {
      title: "Codigo",
      dataIndex: "codigo",
      key: "codigo", 
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre", 
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "descripcion", 
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: "categoria", 
    },
    {
      title: "Precio",
      dataIndex: "precio",
      key: "precio", 
    },
    {
      title: "Cantidad",
      dataIndex: "cantidad",
      key: "cantidad", 
    },
    {
      title: "Imagen",
      dataIndex: "imagen",
      key: "imagen", 
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha", 
    },
    {
      title: "Opciones",
      key: "opciones", 
      render: (fila) =>(<Button className='btnEliminar' type='primary' danger onClick={abrirCerrarModalEliminar} icon={<DeleteOutlined />}></Button>),
    },
  ];

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


//  Peticion Get de la API usando axios.
  
  const peticionGet=async()=>{
    await axios.get(peticionUrl)
    .then(response=>{
      setData(response.dinamicData);
    }).catch(error=>{
      console.log(error);
    })
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(()=>{
    peticionGet();
  },[])



  return (
    <div className='mostrarInventario'>
      <h2 className='subtituloTabla'>Productos Registrados en Inventario</h2>
      {/* TablaDinamica */}
      {/* <Table className='tabla'columns={columnas} dataSource={dinamicData} bordered={true} pagination={{pageSize: 5, pagination: true, position: ["bottomCenter"]}}  size={'small'}/>\ */}

      {/* TablaEstatica */}
    <Table className='tabla'columns={columnas} dataSource={data} bordered={true} pagination={{pageSize: 5, pagination: true, position: ["bottomRight"]}}  size={'small'}/>

    <Modal 
    open={modalEliminar} 
    onCancel={abrirCerrarModalEliminar} 
    centered 
    footer={[
      <Button type="primary" danger onClick={abrirCerrarModalConfirmar} >Aceptar</Button>,
      <Button type='primary'  onClick={abrirCerrarModalEliminar}>Cancelar</Button>,
    ]}>
    ¿Está seguro que desea <b>eliminar</b> el producto del inventario?
    </Modal>

    <Modal className='App-modal-confirmación-eliminado'
    open={modalConfirmar}
    //close={abrirCerrarModalEliminar}
    onCancel={abrirCerrarModalConfirmar} 
    centered
    footer={[
      /*<Button type="primary" danger>Aceptar</Button>,*/
    ]}>
    <p className='App-modal-confirmación-texto'>Este producto ha sido eliminado exitosamente</p>
    </Modal>
    </div>
  );
}

export default TablaInventario;