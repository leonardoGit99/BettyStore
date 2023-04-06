import TablaInventario from "../components/TablaInventario/TablaInventario";
import { Row, Col} from "antd";

export default function MostrarInventario(props){
  return(
      <div>
        <Row>
            <Col >
              <TablaInventario/>    
            </Col>
          </Row>           
      </div>
  )
}