import React from "react";
import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, /*message*/ } from "antd";
//import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import './FormRegProductoStyle.css';


const { Item } = Form;

//Valor seleccionado de la lista desplegable
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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


function FormRegProducto() {

  //Borrar campos en caso de presionar boton cancelar
  const formRef = React.useRef(null);
  const borrarCampos = () => {
    formRef.current?.resetFields();
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
              label="Nombre"
              name="nombre"
              rules={[{
                required: true,
                message: "Porfavor ingrese el nombre del producto",
              },]}
            >
              <Input placeholder="Ingrese el nombre del producto" />
            </Item>

            <Item
              label="Cantidad"
              name="cantidad"
              rules={[{
                required: true,
                message: "Porfavor ingrese la cantidad",
              },]}
            >
              <Input placeholder="Ingrese la cantidad del producto" />
            </Item>

            <Item
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
                onChange={handleChange}
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
              name="fecha"
              rules={[{
                required: true,
                message: "Porfavor ingrese la fecha",
              },]}
            >
              <DatePicker placeholder="DD/MM/AAAA" /*defaultValue={dayjs('01/01/2023', dateFormatList[0])}*/ format={dateFormatList} />
            </Item>

            <Item
              label="Precio (Bs)"
              name="precio"
              rules={[{
                required: true,
                message: "Porfavor ingrese el precio",
              },]}
            >
              <Input placeholder="Ingrese el precio del producto" />
            </Item>
          </Col>
          <Col span={2}></Col>

          <Col span={11} className="c2">
            <Item
              label="Imagen"
              name="imagen"
              rules={[{
                required: true,
                message: "Porfavor ingrese una imagen",
              },]}
            >
              <Upload /*{...props}*/>
                <Button
                  icon={<UploadOutlined />}>Examinar
                </Button>
              </Upload>
            </Item>

            <Item
              label="Codigo"
              name="codigo"
              rules={[{
                required: true,
                message: "Porfavor ingrese el codigo del producto",
              },]}
            >
              <Input placeholder="Ingrese el codigo del producto" />
            </Item>

            <Item
              label="Descripcion"
              name="descripcion"
              rules={[{
                required: true,
                message: "Porfavor ingrese una descripcion del producto",
              },]}
            >
              <TextArea rows={6} placeholder="Ingrese una descripcion del producto" />
            </Item>
          </Col>
        </Row>
        <Row>
          <Item>
            <Button type="primary" htmlType="submit">Registrar</Button>
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