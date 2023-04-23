import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "axios";
import './TablaComprasStyle.css';
import Footer from '../Footer/Footer';

function TablaCompras() {

  const [datosTablaCompra, setDatosTablaCompra] = useState([]);
 
  const columnas = [
    { title: 'Código', dataIndex: 'codDetCompra', key: 'CodDetCompra' },
    { title: 'Nombre', dataIndex: 'nomDetCompra', key: 'nomDetCompra', },
    { title: 'Precio', dataIndex: 'precioDetCompra', key: 'precioDetCompra', },
    { title: 'Cantidad', dataIndex: 'cantDetCompra', key: 'cantDetCompra', },
    { title: 'Fecha', dataIndex: 'fechaDetCompra', key: 'fechaDetCompra', },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaGeneralCompra.php")
      .then(response => {
        setDatosTablaCompra(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div>
      <h2 className='subtituloTabla'>Compras registradas</h2>
      <Table className='tabla' locale={{ emptyText: 'No hay compras registradas' }} rowKey='id' columns={columnas} dataSource={datosTablaCompra} bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'}></Table>
      <Footer/>
    </div>
  )
}
export default TablaCompras;