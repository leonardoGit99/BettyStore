import TablaInventario from "../components/tablaInventario/TablaInventario";
import { Row, Col } from "antd";

export default function MostrarInventario(){
  return(
      <div>
        <Row >
          <Col span={24} >
            <TablaInventario></TablaInventario>      
          </Col>
        </Row>  
      </div>
  )
}