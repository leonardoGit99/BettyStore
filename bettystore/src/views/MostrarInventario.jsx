import TablaInventario from "../components/TablaInventario/TablaInventario";
import { Row, Col} from "antd";

export default function MostrarInventario(){
  return(
      <div>
        <Row>
            <Col >
              <TablaInventario></TablaInventario>      
            </Col>
          </Row>           
      </div>
  )
}