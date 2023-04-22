import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, message, AutoComplete} from "antd";
import axios from "axios";
import {ShoppingCartOutlined} from '@ant-design/icons';

const layout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};


//Formato de fechas par ael campo fecha
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];


function BarraBusqueda() {

  const [productos, setProductos] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [datos, setDatos] = useState([{
    codProd: '',
    nomProd: '',
    precioProd: '',
    cantidadProd: '',
  }]);

  const [seleccionado, setSeleccionado] = useState({});

  const peticionGet = async () => {
    await axios.get("http://localhost/crudProductos/indexConsultaSimple.php")
      .then(response => {
        setProductos(response.data);
        setDatos(response.data);
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  useEffect(() => {
    peticionGet();
  }, [])

  function handleSelect(selectedValue, selectedOption){
    setSeleccionado(selectedOption);
  }

  function handleSearch(busqueda){
    const filtrado = datos.filter((producto) =>
      filtrarOpciones(busqueda, producto)
    );
    setProductos(filtrado);
  }

  function filtrarOpciones(busqueda, producto){
    return producto.nomProd.toLowerCase().indexOf(busqueda.toLowerCase()) !== -1;
  }

  function mostrarSeleccionado(){
    console.log(seleccionado);
  }

  return (
    <div className="formRegProducto">

      <AutoComplete style={{width:800}}
        options={productos.map((producto) => ({value:producto.nomProd, cantidadProd:producto.cantidadProd, precioProd:producto.precioProd, codProd:producto.codProd}))}
        onSelect={handleSelect}
        placeholder="Busque un producto del inventario"
        onSearch={handleSearch}
      >
        <Input
          size="large"
        />
      </AutoComplete>

      <Button onClick={mostrarSeleccionado}>Mostrar seleccionado por consola</Button>
      <Input style={{color: "#676767"}} disabled placeholder="Ningun producto seleccionado" value={seleccionado.value}></Input>
      <Button icon={<ShoppingCartOutlined />}>Agregar</Button>

    </div>
  );
}

export default BarraBusqueda;