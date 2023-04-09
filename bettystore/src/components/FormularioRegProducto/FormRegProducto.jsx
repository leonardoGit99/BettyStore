import React, { useRef, useState } from "react";
import { Form, Input, Button, Col, Row, Select, DatePicker, Upload, message } from "antd";
import dayjs from "dayjs";
import { UploadOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import TablaInventario from "../TablaInventario/TablaInventario";
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


//Formato de fechas par ael campo fecha
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];


function FormRegProducto() {

  //Borrar campos en caso de presionar boton cancelar
  const formRef = React.useRef(null);
  const borrarCampos = () => {
    formRef.current?.resetFields();
  }

  const [producto, setProducto] = useState({
    codProd: '',
    nomProd: '',
    categoriaProd: '',
    descripcionProd: '',
    precioProd: '',
    cantidadProd: '',
    fechaProd:'',
  })

  const [fileList, setFileList] = useState([]);

  //Capturar lo que el usuario esta escribiendo en los inputs, tiene que coincidir el nombre del estado con la propiedad name del input
  const handleChange = e => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
    console.log(producto);
  }
  //Valor seleccionado de la lista desplegable
  const handleChangeSelected = (value) => {
    console.log(`selected ${value}`);
    producto["categoriaProd"]=value;
  };

  //Valor de fecha seleccionada
  const handleChangeDate = (value) => {
    const date= dayjs(value).format(dateFormatList[0]);
    console.log(date);
    producto['fechaProd']=date;
  }

  //Bloquear fechas menores a la actual
  const disabledDate = (current) => {
    // Can not select days before today and today
    
    return current && current < dayjs().endOf('day');
  };

  //  Peticion POST a la API usando axios.
  const peticionPost = async () => {

    const datos = new FormData();
    datos.append("codProd", producto['codProd']);
    datos.append("nomProd", producto['nomProd']);
    datos.append("categoriaProd", producto['categoriaProd']);
    datos.append("descripcionProd", producto['descripcionProd']);
    datos.append("precioProd", producto['precioProd']);
    datos.append("cantidadProd", producto['cantidadProd']);
    datos.append("fechaProd", producto['fechaProd']);
    datos.append("imagenProd", fileList[0]);


    console.log(datos.get('codProd'));
    console.log(datos.get('nomProd'));
    console.log(datos.get('categoriaProd'));
    console.log(datos.get('descripcionProd'));
    console.log(datos.get('precioProd'));
    console.log(datos.get('cantidadProd'));
    console.log(datos.get('fechaProd'));
    console.log(datos.get('imagenProd'));

    await axios.post("http://localhost/APIPHP/indexInsertar.php/?insertar=1", datos)
      .then(response => {
        // props.setData(props.datosTabla.concat(response.data.list
        console.log(response);
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
              rules={[{
                required: true,
                message: "Porfavor seleccione una categoria",
              },]}
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
              rules={[{
                required: true,
                message: "Porfavor ingrese la fecha",
              },]}
            >
              <DatePicker  name="fechaProd" placeholder="DD/MM/AAAA" disabledDate={disabledDate} format={dateFormatList}  onChange={handleChangeDate}/>
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
          <Col span={2}></Col>

          <Col span={11} className="c2">
            <Item
              label="Imagen"
              name="imagenProd"
              valuePropName="fileList"
              getValueFromEvent={(event)=>{
                return event?.fileList;
              }}
              /*
              rules={[{
                required: true,
                message: "Porfavor ingrese una imagen",
              },]}
              */
            >
              <Upload maxCount={1} customRequest={(info) =>{
                setFileList([info.file])
                console.log(info.file)
              }}
              showUploadList={false}
              >
                <Button
                  icon={<UploadOutlined />}>Examinar
                </Button>
                {fileList[0]?.name}
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
              <TextArea name="descripcionProd" rows={6} placeholder="Ingrese una descripcion del producto" onChange={handleChange}/>
            </Item>
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