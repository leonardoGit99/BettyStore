import React from "react";
import './FormProducto.css'

import { createRef, useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import {Form,Space,Input, Button ,Radio ,Alert,Col ,Row, DatePicker , Select,message, Upload} from 'antd';
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";


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

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const dateFormat = 'YYYY/MM/DD';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];



 

function FormProducto() {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const onFormLayoutChange = ({ layout }) => {
    setFormLayout(layout);
  };

  const formRef=React.useRef(null);
 const borrarCampos=()=>{
    formRef.current?.resetFields();
 }

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4,
          },
          wrapperCol: {
            span: 14,
          },
        }
      : null;
  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
          wrapperCol: {
            span: 14,
            offset: 4,
          },
        }
      : null;


 
    return (  
        <div className="formProducto">
            <h1 className="tituloForm">Registrar Producto</h1>
          <Row>

            <Col flex="none" ></Col>
            <Col flex={4}>

            <Form  className="form-principal" ref={formRef} 
            {...formItemLayout}
            layout={formLayout}
            form={form}
            initialValues={{layout: formLayout,}}
            onValuesChange={onFormLayoutChange}
            >
             <Row   className="filaForm">
             <Col span={12}>
            <Form.Item label="Nombre"
              rules={[{
                required:true,
                message:"Porfavor ingrese el nombre del producto",
              },]}>
              <Input placeholder="ingrese el nombre del producto aqui" />
            </Form.Item>
            <Form.Item label="Cantidad"
              rules={[{
                required:true,
                message:"Porfavor ingrese la cantidad del producto"
              },]}>
              <Input placeholder="ingrese el cantidad del producto aqui" />
            </Form.Item>
            <Form.Item label="Categoria">
              <Space wrap>
                <Select
                  defaultValue="Bebidas"
                  style={{width: 120,}}
                  onChange={handleChange}
                  options={[
                    { value: 'Frutas',
                      label: 'Frutas',},
                    { value: 'Juguete',
                      label: 'Juguete',},
                    { value: 'Fritura',
                      label: 'Fritura',},
                    { value: 'Bebidas',
                      label: 'Bebidas',},
                  ]}
                />        
              </Space>
            </Form.Item>
            <Form.Item label="Fecha">
              <Space>
                <DatePicker defaultValue={dayjs('01/01/2023', dateFormatList[0])} format={dateFormatList} />
              </Space>
            </Form.Item>
            <Form.Item label="Precio"
              rules={[{
                required:true,
                message:"Porfavor ingrese el precio del producto"
              },]}>
              <Input placeholder="ingrese el precio del producto" />
            </Form.Item>
            
            <Form.Item {...buttonItemLayout}>
              <Button type="primary" htmlType="submit"  >Registrar</Button>
              <Button  htmlType="button" onClick={borrarCampos}>Cancelar</Button>
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="Imagen">
              <Upload {...props}>
                  <Button className="entrada"
                      icon={<UploadOutlined />}>Examinar</Button>
                </Upload>
            </Form.Item>
            <Form.Item label="Codigo"
              rules={[{
                required:true,
                message:"Porfavor ingrese el codigo del producto"
              },]}>
              <Input placeholder="ingrese el codigo del producto aqui" />
            </Form.Item>
            <Form.Item label="Descripcion"
              rules={[{
                required:true,
                message:"Porfavor ingrese la descripcion producto"
              },]}>
              <TextArea rows={4} placeholder="ingrese una pequeña descripcion del producto" />
            </Form.Item>
            
            
            
            </Col>
              </Row> 
            
            
          </Form>
            </Col>
            

          </Row>
          
        </div>
    );
}

export default FormProducto;