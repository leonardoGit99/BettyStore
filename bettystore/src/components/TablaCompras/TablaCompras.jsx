import React, { useEffect, useState } from 'react';
import { Table, Spin } from 'antd';
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import './TablaComprasStyle.css';
import Footer from '../Footer/Footer';

function TablaCompras() {

  const [datosTablaCompra, setDatosTablaCompra] = useState([]);

  const [cargandoTabla, setCargandoTabla] = useState(true);


  const columnas = [
    { title: 'Código Compra', dataIndex: 'codDetCompra', key: 'CodDetCompra' },
    { title: 'Nombre', dataIndex: 'nomDetCompra', key: 'nomDetCompra', },
    { title: 'Precio (Bs.)', dataIndex: 'precioDetCompra', key: 'precioDetCompra', },
    { title: 'Cantidad', dataIndex: 'cantDetCompra', key: 'cantDetCompra', },
    { title: 'Fecha', dataIndex: 'fechaDetCompra', key: 'fechaDetCompra', },
  ];


  //  Peticion Get de la API usando axios.

  const peticionGet = async () => {
    try {
      await axios.get("http://localhost/IndexConsultasSegundoSprint/indexConsultaGeneralCompra.php")
        .then(response => {
          setDatosTablaCompra(response.data);
          console.log(response.data);
        }).catch(error => {
          console.log(error);
        })
    } catch (error) {
      console.log('Error al cargar los datos  a la tabla del tipo: ', error);
    } finally {
      setCargandoTabla(false);
    }
  }

  //uso de useEffect para poder llamar a la peticion

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div>
      <h2 className='subtituloTabla'>Compras registradas</h2>
      <Table
        className='tablasInvComprVentRegistradas'
        locale={cargandoTabla ? (
          { emptyText: <Spin indicator={<LoadingOutlined style={{ color: '#132D46' }} />} tip="Cargando compras registradas..." style={{ color: '#132D46' }} /> }
        ) : (
          { emptyText: 'No hay compras registradas' })}
        rowKey='codDetCompra'
        columns={columnas}
        dataSource={datosTablaCompra}
        bordered={true}
        pagination={{ pageSize: 7, pagination: true, position: ["bottomRight"] }}
        size={'middle'}>
      </Table>
      <Footer />
    </div>
  )
}
export default TablaCompras;