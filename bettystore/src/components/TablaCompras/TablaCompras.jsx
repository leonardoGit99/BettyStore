import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from "axios";
import './TablaComprasStyle.css';

function TablaComprasRegistradas() {

  const [datosTablaCompra, setDatosTablaCompra] = useState([]);

  const columnas = [
    { title: 'Código', dataIndex: 'codProd', key: 'codProd' },
    { title: 'Nombre', dataIndex: 'nomProd', key: 'nomProd', },
    { title: 'Precio', dataIndex: 'precioProd', key: 'precioProd', },
    { title: 'Cantidad', dataIndex: 'cantidadProd', key: 'cantidadProd', },
    { title: 'Fecha', dataIndex: 'fechaProd', key: 'fechaProd', },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    await axios.get("http://localhost/crudProductos/...")
      .then(response => {
        setDatosTablaCompra(response.data);
        // console.log(response.data);
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
    </div>
  )
}
export default TablaComprasRegistradas;