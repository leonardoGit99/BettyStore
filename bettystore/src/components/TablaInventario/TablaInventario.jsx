import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from "axios";
//import ErrorList from 'antd/es/form/ErrorList';
import { DeleteOutlined } from '@ant-design/icons'
import './TablaInventarioStyle.css';


function TablaInventario(props) {
  const peticionGetAPI = "http://localhost/crudProductos/index.php";
  const peticionDeleteAPI = "http://localhost/crudProductos/index.php?borrar";
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
      title: "Categoria",
      dataIndex: "categoriaProd",
      key: "categoriaProd",
    },
    {
      title: "Descripcion",
      dataIndex: "descripcionProd",
      key: "descripcionProd",
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
      title: "Fecha",
      dataIndex: "fechaProd",
      key: "fechaProd",
    },
    {
      title: "Imagen",
      dataIndex: "imagenProd",
      key: "imagenProd",
    },
    {
      title: "Opciones",
      key: "opciones",
      render: (fila) => (<Button className='btnEliminar' type='primary' danger onClick={abrirCerrarModalEliminar} icon={<DeleteOutlined />}></Button>),
    },
  ];

  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get(peticionGetAPI)
      .then(response => {
        props.setDatosTabla(response.data);
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
    await axios.delete(peticionDeleteAPI + props.producto.id)
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
      <Table className='tabla' rowKey='codProd' columns={columnas} dataSource={props.datosTabla} bordered={true} pagination={{ pageSize: 5, pagination: true, position: ["bottomCenter"] }} size={'small'} />\

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