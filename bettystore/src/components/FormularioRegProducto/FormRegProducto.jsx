import React, { useState, useRef } from "react";
import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, message } from "antd";
import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import './FormRegProductoStyle.css';



const { Item } = Form;

//  Darle forma o alinear los labels del formulario
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

//Formato de fechas para el campo fecha
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
const peticionPostURL = "http://localhost/crudProductos/index.php?insertar=1";


function FormRegProducto(props) {

  //Borrar campos en caso de presionar boton cancelar
  const formRef = useRef(null);
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
    await axios.post(peticionPostURL, props.producto)
      .then(response => {
        props.setDatosTabla(props.datosTabla.concat(response.data));
        console.log(response);
//        borrarCampos();   no funciona r
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <div className="formRegProducto">
      <Form {...layout} ref={formRef}>
        <Row>
          <h2 className="tituloRegistrar">Registrar Producto</h2>
        </Row>
        <Row>
          <Col span={11} className="c1">
            <Item
              label="Nombre"
              name="nomProd"
              rules={[{
                required: true,
                message: "Porfavor ingrese el nombre del producto",
              },]}
            >
              <Input name="nomProd" placeholder="Ingrese el nombre del producto" onChange={handleChange} />
            </Item>

            <Item
              label="Cantidad"
              name="cantidadProd"
              rules={[{
                required: true,
                message: "Porfavor ingrese la cantidad",
              },]}
            >
              <Input name="cantidadProd" placeholder="Ingrese la cantidad del producto" onChange={handleChange} />
            </Item>

            <Item
              label="Categoria"
              name="categoriaProd"
            /*
            rules={[{
              required: true,
              message: "Porfavor seleccione una categoria",
            },]}
            */
            >
              <Select
                defaultValue="Aseo y Limpieza"
                name="categoriaProd"
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
            </Item>

            <Item
              label="Fecha"
              name="fechaProd"
            /*
            rules={[{
              required: true,
              message: "Porfavor ingrese la fecha",
            },]}
            */
            >
              <DatePicker name="fechaProd" placeholder="DD/MM/AAAA" defaultValue={dayjs('01/01/2023', dateFormatList[0])} format={dateFormatList} onChange={handleChangeSelected} />
            </Item>

            <Item
              label="Precio"
              name="precioProd"
              rules={[{
                required: true,
                message: "Porfavor ingrese el precio",
              },]}
            >
              <Input name="precioProd" placeholder="Ingrese el precio del producto" onChange={handleChange} />
            </Item>
          </Col>
          <Col span={1}></Col>

          <Col span={11} className="c2">
            <Item
              label="Imagen"
              name="imagenProd"
            /*
            rules={[{
              required: true,
              message: "Porfavor ingrese una imagen",
            },]}
            */
            >
              <Upload {...props}>
                <Button
                  icon={<UploadOutlined />}>Examinar
                </Button>
              </Upload>
            </Item>

            <Item
              label="Codigo"
              name="codProd"
              rules={[{
                required: true,
                message: "Porfavor ingrese el codigo del producto",
              },]}
            >
              <Input name="codProd" placeholder="Ingrese el codigo del producto" onChange={handleChange} />
            </Item>

            <Item
              label="Descripcion"
              name="descripcionProd"
            /*
            rules={[{
              required: true,
              message: "Porfavor ingrese una descripcion del producto",
            },]}
            */
            >
              <TextArea name="descripcionProd" rows={6} placeholder="Ingrese una descripcion del producto" onChange={handleChange} />
            </Item>
          </Col>
        </Row>
        <Row>
          <Item>
            <Button className="botonRegistrar" type="primary" htmlType="submit" onClick={peticionPost}>Registrar</Button>
          </Item>

          <Item>
            <Button className="botonCancelar" htmlType="button" onClick={borrarCampos}>Cancelar</Button>
          </Item>
        </Row>
      </Form>

    </div>
  );
}

export default FormRegProducto;