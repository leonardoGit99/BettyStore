import { Row, Col} from "antd";
import TablaVentas from "../components/TablaVentas/TablaVentas";

export default function MostrarVenta(props){
  return(
      <div>
        <Row>
          <Col lg={2} xs={2}></Col>
            <Col lg={20} xs={20}>
                <TablaVentas />
            </Col>
            <Col lg={2} xs={2}></Col>
          </Row>           
      </div>
  )
}