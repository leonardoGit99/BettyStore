import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, message, Image, Row, Col} from 'antd';
import axios from "axios";
//import ErrorList from 'antd/es/form/ErrorList';
import { DeleteOutlined } from '@ant-design/icons'
import './TablaInventarioStyle.css';
import Footer from '../Footer/Footer';


function TablaInventario(props) {

  // const [data, setData] = useState([]);

  const columnas = [
    {
      title: "Código", dataIndex: "codProd", key: "codProd",
    },
    {
      title: "Nombre", dataIndex: "nomProd", key: "nomProd",
    },
    {
      title: "Descripción", dataIndex: "descripcionProd", key: "descripcionProd",
    },
    {
      title: "Categoría", dataIndex: "categoriaProd", key: "categoriaProd",
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
    await axios.get("http://localhost/crudProductos/indexConsultaGeneral.php")
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
      okText: 'Eliminar',
      cancelText: 'Cancelar',
      okType: 'danger',
      title: '¿Está seguro que desea eliminar el producto '+fila.nomProd+' del inventario?',
      maskClosable: 'true',
      onOk: ()=>{

        axios.get('http://localhost/crudProductos/indexEliminar.php/?borrar=' + fila.codProd)
        .then(response => {
          peticionGet();
          console.log(response);
        }).catch(error => {
          console.log(error);
        })
        message.info('Este producto ha sido eliminado exitosamente', 2);

      } 
      
    })
  }

  return (
    <div className='mostrarInventario'>
      <Row>
        <Col lg={2}></Col>
        <Col lg={20}>
          <h2 className='subtituloTabla'>Productos Registrados en Inventario</h2>
          {/* TablaDinamica */}
          <Table className='tabla' locale={{emptyText: 'No hay productos registrados'}} rowKey='id' columns={columnas} dataSource={props.datosTabla} bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'} />

          {/* TablaEstatica */}
          {/* <Table className='tabla'columns={columnas} dataSource={data} bordered={true} pagination={{pageSize: 5, pagination: true, position: ["bottomRight"]}}  size={'small'}/> */}
          <Footer/>
        </Col>
      </Row>
      <Col lg={2}></Col>
    </div>
  );
}

export default TablaInventario;