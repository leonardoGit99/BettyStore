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
    span: 4
  },
  wrapperCol: {
    span: 20
  }
};


//Formato de fechas par ael campo fecha
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];


function FormRegProducto() {

  //Borrar campos en caso de presionar boton cancelar
  const formRef = useRef(null);
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
    fechaProd: '',
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
    producto["categoriaProd"] = value;
  };

  //Valor de fecha seleccionada
  const handleChangeDate = (value) => {
    const date = dayjs(value).format(dateFormatList[0]);
    console.log(value);
    producto['fechaProd'] = date;
  }

  //Bloquear fechas menores a la actual
  const disabledDate = (current) => {
    // Can not select days before today and today

    return current && current < dayjs();
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

    await axios.post("http://localhost/crudProductos/indexInsertar.php/?insertar=1", datos)
      .then(response => {
        message.info(response.data, 2);
        borrarCampos();
        console.log(response);
      }).catch(error => {
        console.log(error);
      })
  }


  return (
    <div className="formRegProducto">
      <Row>
        <h2 className="tituloRegistrar">Registrar Producto</h2>
      </Row>
      <Form {...layout} ref={formRef} className="containerForm" onFinish={peticionPost}>

        <Row>
          <Col lg={11} xs={24}>
            <Item
              label="Nombre"
              name="nomProd"
              rules={[{
                required: true,
                message: "Por favor, ingrese el nombre del producto",
              },
              {
                whitespace: true,
                message: 'No puede dejar en blanco este campo',
              },

              {
                min: 4,
                message: 'Debe ingresar minimo 4 caracteres'
              },
              {
                validator: (_, value) =>
                  value && value.match('[a-zA-Z0-9\s]+$')
                    ? Promise.resolve()
                    : Promise.reject(new Error('Debe ingresar caracteres válidos')),
              },/*
                {pattern:'/^[a-zA-Z0-9\-\s]$/',
                  message:'valores no validos '
                },*/
              ]}

            >
              <Input className="entradaDatos"
                name="nomProd"
                placeholder="Ingrese el nombre del producto"
                onChange={handleChange}
                showCount
                maxLength={24} />
            </Item>

            <Item
              label="Cantidad"
              name="cantidadProd"

              rules={[{
                required: true,
                message: "Por favor, ingrese la cantidad",
              },
              {
                whitespace: true,
                message: 'No puede dejar en blanco este campo',
              },
              {
                validator: (_, value) =>
                  value && value.match('^[0-9]+$')
                    ? Promise.resolve()
                    : Promise.reject(new Error('Debe ingresar solo números')),
              },
              ]}
            >
              <Input className="entradaDatos"
                name="cantidadProd"
                placeholder="Ingrese la cantidad del producto"
                onChange={handleChange}
                showCount
                maxLength={4} />
            </Item>

            <Item className="entradaDatosCategoria"
              label="Categoría"
              name="categoriaProd"
              rules={[{
                required: true,
                message: "Por favor, seleccione una categoría",
              },]}
            >
              <Select
                placeholder="Seleccione una categoría"
                //defaultValue="Aseo y Limpieza"
                name="categoriaProd"
                //style={{ width: 170, }}
                onChange={handleChangeSelected}
                options={[
                  {
                    value: 'Aseo y Limpieza',
                    label: 'Aseo y Limpieza',
                  },
                  {
                    value: 'Golosinas',
                    label: 'Golosinas',
                  },
                  {
                    value: 'Aguas y Bebidas',
                    label: 'Aguas y Bebidas',
                  },
                  {
                    value: 'Lácteos',
                    label: 'Lácteos',
                  },
                  {
                    value: 'Licorería',
                    label: 'Licorería',
                  },
                  {
                    value: 'Abarrotes y Despensa',
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
                message: "Por favor, seleccione una fecha",
              },]}
            >
              <DatePicker name="fechaProd"
                placeholder="DD/MM/AAAA"
                disabledDate={disabledDate}
                format={dateFormatList}
                onChange={handleChangeDate} />
            </Item>

            <Item
              label="Precio"
              name="precioProd"

              rules={[{

                required: true,
                message: "Por favor, ingrese el precio",
              },
              {
                whitespace: true,
                message: 'No puede dejar en blanco este campo',
              },
              {
                validator: (_, value) =>
                  value && value.match(/^[0-9]+(.[0-9]+)?$/)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Solo puede ingresar números y el signo "."')),
              },
              ]}
            >
              <Input className="entradaDatos"
                name="precioProd"
                placeholder="Ingrese el precio del producto"
                onChange={handleChange}

                suffix='Bs  '
                maxLength={6}
              />
            </Item>
          </Col>
          <Col lg={1}></Col>

          <Col lg={11} xs={24} className="c2">
            <Item
              label="Imagen"
              name="imagenProd"
              valuePropName="fileList"
              getValueFromEvent={(event) => {
                return event?.fileList;
              }}

              rules={[{
                required: true,
                message: "Por favor, ingrese una imagen",
              },]}

            >
              <Upload maxCount={1} customRequest={(info) => {
                setFileList([info.file])
                console.log(info.file)
              }}
                showUploadList={false}
              >
                <Button
                  icon={<UploadOutlined />}>Examinar
                </Button>
                <p className="nombreArchivoSubido">{fileList[0]?.name}</p>
              </Upload>
            </Item>

            <Item
              label="Código"
              name="codProd"

              rules={[{
                required: true,
                message: "Por favor, ingrese el código del producto",
              },
              {
                whitespace: true,
                message: 'No puede dejar en blanco este campo',
              },
              {
                validator: (_, value) =>
                  value && value.match(/^[0-9]+$/)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Debe ingresar solo valores numéricos')),
              },
              {
                min: 11,
                message: 'Código inválido'
              },
              ]}
            >
              <Input className="entradaDatos"
                name="codProd"
                placeholder="Ingrese el código del producto"
                onChange={handleChange}
                showCount
                maxLength={13} />
            </Item>

            <Item
              label="Descripción"
              name="descripcionProd"
            /*
            rules={[{
              required: true,
              message: "Porfavor ingrese una descripcion del producto",
            },]}
            */
            >
              <TextArea name="descripcionProd"
                placeholder="Ingrese una descripción del producto"
                onChange={handleChange}
                showCount
                maxLength={135}
                autoSize={{ minRows: 6, maxRows: 6 }} />
            </Item>
          </Col>
        </Row>
        <Row>
          <Item>
            <Button className="botonRegistrar" type="primary" htmlType="submit">Registrar</Button>
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