import { Row, Col} from "antd";
import TablaCompras from "../components/TablaCompras/TablaCompras";

export default function MostrarCompra(props){
  return(
      <div>
        <Row>
          <Col lg={2}></Col>
            <Col lg={20}>
                <TablaCompras />
            </Col>
            <Col lg={2}></Col>
          </Row>           
      </div>
  )
}