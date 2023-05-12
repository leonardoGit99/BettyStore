import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "axios";
import './TablaVentasStyle.css';
import Footer from '../Footer/Footer';

function TablaVentas() {
//Comentario para resolver conflictos
  const [datosTablaVenta, setDatosTablaVenta] = useState([]);

  const columnas = [
    { title: 'Código de venta', dataIndex: 'codDetVenta', key: 'codDetVenta' },
    { title: 'Nombre', dataIndex: 'nomDetVenta', key: 'nomDetVenta', },
    { title: 'Precio (Bs.)', dataIndex: 'precioDetVenta', key: 'precioDetVenta', },
    { title: 'Cantidad', dataIndex: 'cantDetVenta', key: 'cantDetVenta', },
    { title: 'Fecha', dataIndex: 'fechaDetVenta', key: 'fechaDetVenta', },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaGeneralCompra.php")
      .then(response => {
        setDatosTablaVenta(response.data);
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
      <h2 className='subtituloTablaVentas'>Ventas registradas</h2>
      <Table className='tablaVentas' locale={{ emptyText: 'No hay ventas registradas' }} rowKey='codDetVenta' columns={columnas} dataSource={datosTablaVenta} bordered={true} pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }} size={'middle'}></Table>
      <Footer />
    </div>
  )
}
export default TablaVentas;