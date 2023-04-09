import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Image } from 'antd';
import axios from "axios";
//import ErrorList from 'antd/es/form/ErrorList';
import { DeleteOutlined } from '@ant-design/icons'
import './TablaInventarioStyle.css';


function TablaInventario(props) {

  const columnas = [
    {
      title: "Codigo", dataIndex: "codProd", key: "codProd",
    },
    {
      title: "Nombre", dataIndex: "nomProd", key: "nomProd",
    },
    {
      title: "Descripcion", dataIndex: "descripcionProd", key: "descripcionProd",
    },
    {
      title: "Categoria", dataIndex: "categoriaProd", key: "categoriaProd",
    },
    {
      title: "Precio (Bs)", dataIndex: "precioProd", key: "precioProd",
    },
    {
      title: "Cantidad", dataIndex: "cantidadProd", key: "cantidadProd",
    },    
    {
      title: "Fecha", dataIndex: "fechaProd", key: "fechaProd",
    },
    {
      title: "Imagen", dataIndex: "imagenProd", key: "imagenProd", render: (imagen) => (<Image src={'data:image/png;base64,'+imagen} alt='X Preview' height={60} width={60}/>),
    },
    {
      title: "Opciones", key: "opciones",render: (fila) => (<Button className='btnEliminar' type='primary' danger onClick={()=>{peticionDelete(fila)}} icon={<DeleteOutlined />}></Button>),
    },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get("http://localhost/crudProductos/index.php")
      .then(response => {
        props.setDatosTabla(response.data);
        // console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(() => {
    peticionGet();
  }, [])


  //  Peticion delete a la API usando axios.
  const peticionDelete = (fila) => {
    // console.log(fila);
    Modal.confirm({
      cancelText: 'Cancelar',
      okText: 'Eliminar',
      okType: 'danger',
      title: '¿Esta seguro que desea eliminar el producto '+fila.nomProd+' del inventario?',
      maskClosable: 'true',
      onOk: ()=>{

        axios.get('http://localhost/crudProductos/index.php/?borrar=' + fila.codProd)
        .then(response => {
          console.log(response);
        }).catch(error => {
          console.log(error);
        })

        message.info('Este producto ha sido eliminado exitosamente');

        peticionGet();

      } 
      
    })

  }

  return (
    <div className='mostrarInventario'>
      <h2 className='subtituloTabla'>Productos Registrados en Inventario</h2>
      {/* TablaDinamica */}
      <Table className='tabla' rowKey='id' columns={columnas} dataSource={props.datosTabla} bordered={true} pagination={{ pageSize: 5, pagination: true, position: ["bottomRight"] }} size={'small'} />\

      {/* TablaEstatica */}
      {/* <Table className='tabla'columns={columnas} dataSource={data} bordered={true} pagination={{pageSize: 5, pagination: true, position: ["bottomRight"]}}  size={'small'}/> */}

    </div>
  );
}

export default TablaInventario;