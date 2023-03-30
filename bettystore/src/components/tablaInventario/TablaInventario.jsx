import './tablaInventarioStyle.css';
import React from 'react';
import {Table, Button} from 'antd';



function TablaInventario() {
  const columns= [
    {title: "Codigo",
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
      dataIndex: "opciones",
      key: "opciones", 
     //render: fila => <Button className='btnEliminar' type="primary" >Eliminar</Button>
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
      imagen: "img preview",
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
      imagen: "img preview",
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
    {
      key: '7', 
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
      key: '8', 
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
      key: '9', 
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
      key: '10', 
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
      key: '11', 
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

  return (
    <div className="tabla">
      <h2 className='subtituloTabla'>Productos Registrados en Inventario</h2>
      <Table className='tablaMostrarInventario'columns={columns} dataSource={data} bordered={true} pagination={{pageSize: 5, pagination: true}}/>
    </div>
  );
}

export default TablaInventario;