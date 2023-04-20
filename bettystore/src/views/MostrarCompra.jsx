import { Row, Col} from "antd";
import TablaCompras from "../components/TablaCompras/TablaCompras";

export default function MostrarCompra(props){
  return(
      <div>
        <Row>
          <Col span={2}></Col>
            <Col span={20}>
                <TablaCompras />
            </Col>
            <Col span={2}></Col>
          </Row>           
      </div>
  )
}