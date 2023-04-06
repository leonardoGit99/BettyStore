import React, { useState } from "react";
import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, /*message*/ } from "antd";
//import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import TablaInventario from "../TablaInventario/TablaInventario";
import './FormRegProductoStyle.css';



const { Item } = Form;



//Formato de fechas par ael campo fecha
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
//Control y subida de imagen
/*
const props = {
  name: 'file',
  action: 'https://run.mocky.io/v3/93883d20-fe3f-4006-8406-e01ec4210410',
  headers: {
    authorization: 'authorization-text',
    accept:".jpg, .jpeg, .png",
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
*/

//Peticion de la API
const peticionUrl = "https://api.dailymotion.com/videos?channel=sport&limit=10";


function FormRegProducto(props) {

  //Borrar campos en caso de presionar boton cancelar
  const formRef = React.useRef(null);
  const borrarCampos = () => {
    formRef.current?.resetFields();
  }

  /*
  //Los nombres dentro el useState deben coincidir con los de la API
  const [producto, setProducto] = useState({
    id: '',
    title: '',
    channel: '',
    owner: '',
  })
*/
  //Capturar lo que el usuario esta escribiendo en los inputs, tiene que coincidir el nombre del estado con la propiedad name del input
  const handleChange = e => {
    const { name, value } = e.target;
    props.setProducto({ ...props.producto, [name]: value });
    console.log(props.producto);
  }

  //Valor seleccionado de la lista desplegable
  const handleChangeSelected = (value) => {
    console.log(`selected ${value}`);
  };


  //  Peticion POST a la API usando axios.

  const peticionPost = async () => {
    await axios.post(peticionUrl, props.producto)
      .then(response => {
        props.setData(props.datosTabla.concat(response.data.list));
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }



  return (
    <div className="formRegProducto">
      <Form ref={formRef} >
        <Row>
          <h2>Registrar Producto</h2>
        </Row>
        <Row>
          <Col span={11} className="c1">
            <Item
              label="Id"
              name="id"
              rules={[{
                required: true,
                message: "Porfavor ingrese el nombre del producto",
              },]}
            >
              <Input name="id" placeholder="Ingrese el nombre del producto" onChange={handleChange} />
            </Item>

            <Item
              label="Title"
              name="title"
              rules={[{
                required: true,
                message: "Porfavor ingrese la cantidad",
              },]}
            >
              <Input name="title" placeholder="Ingrese la cantidad del producto" onChange={handleChange} />
            </Item>

            {/* <Item
              label="Categoria"
              name="categoria"
              rules={[{
                required: true,
                message: "Porfavor seleccione una categoria",
              },]}
            >
              <Select
                defaultValue="Aseo y Limpieza"
                style={{ width: 170, }}
                onChange={handleChangeSelected}
                options={[
                  {
                    value: 'aseoylimpieza',
                    label: 'Aseo y Limpieza',
                  },
                  {
                    value: 'golosinas',
                    label: 'Golosinas',
                  },
                  {
                    value: 'aguasybebidas',
                    label: 'Aguas y Bebidas',
                  },
                  {
                    value: 'lacteos',
                    label: 'Lacteos',
                  },
                  {
                    value: 'licoreria',
                    label: 'Licoreria',
                  },
                  {
                    value: 'abarrotesydespensa',
                    label: 'Abarrotes y Despensa',
                  },
                ]}
              />
            </Item> */}
            {/* 
            <Item
              label="Fecha"
              name="fecha"
              rules={[{
                required: true,
                message: "Porfavor ingrese la fecha",
              },]}
            >
              <DatePicker name="fecha" placeholder="DD/MM/AAAA" defaultValue={dayjs('01/01/2023', dateFormatList[0])} format={dateFormatList}  onChange={handleChangeSelected}/>
            </Item> */}

            <Item
              label="Channel"
              name="channel"
              rules={[{
                required: true,
                message: "Porfavor ingrese el precio",
              },]}
            >
              <Input name="channel" placeholder="Ingrese el precio del producto" onChange={handleChange} />
            </Item>
          </Col>
          <Col span={2}></Col>

          <Col span={11} className="c2">
            {/* <Item
              label="Imagen"
              name="imagen"
              rules={[{
                required: true,
                message: "Porfavor ingrese una imagen",
              },]}
            >
              <Upload {...props}>
                <Button
                  icon={<UploadOutlined />}>Examinar
                </Button>
              </Upload>
            </Item> */}

            <Item
              label="Owner"
              name="owner"
              rules={[{
                required: true,
                message: "Porfavor ingrese el codigo del producto",
              },]}
            >
              <Input name="owner" placeholder="Ingrese el codigo del producto" onChange={handleChange} />
            </Item>

            {/* <Item
              label="Descripcion"
              name="descripcion"
              rules={[{
                required: true,
                message: "Porfavor ingrese una descripcion del producto",
              },]}
            >
              <TextArea name="descripcion" rows={6} placeholder="Ingrese una descripcion del producto" onChange={handleChange}/>
            </Item> */}
          </Col>
        </Row>
        <Row>
          <Item>
            <Button type="primary" htmlType="submit" onClick={peticionPost}>Registrar</Button>
          </Item>

          <Item>
            <Button htmlType="button" onClick={borrarCampos}>Cancelar</Button>
          </Item>
        </Row>
      </Form>

    </div>
  );
}

export default FormRegProducto;