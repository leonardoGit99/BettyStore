import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import './TablaDetalleComprasStyle.css';

function TablaDetalleCompras() {


  const columnas = [
    { title: 'Código', dataIndex: 'codDetCompra', key: 'CodDetCompra' },
    { title: 'Nombre', dataIndex: 'nomDetCompra', key: 'nomDetCompra', },
    { title: 'Precio', dataIndex: 'precioDetCompra', key: 'precioDetCompra', },
    { title: 'Cantidad', dataIndex: 'cantDetCompra', key: 'cantDetCompra', },
    { title: 'Fecha', dataIndex: 'fechaDetCompra', key: 'fechaDetCompra', },
  ];


  return (
    <div>
      <h2 className='subtituloTablaDetalleCompras'>Detalle de compra</h2>
      <Table className='tabla' locale={{ emptyText: 'No hay compras' }} rowKey='id' columns={columnas}  bordered={true} pagination={{ pageSize: 4, pagination: true, position: ["bottomRight"] }} size={'small'}></Table>
    </div>
  )
}
export default TablaDetalleCompras;