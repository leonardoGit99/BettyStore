import { Row, Col} from "antd";
//import TablaVentas from "../components/TablaCompras/TablaVentas";

function MostrarVenta(props){
  return(
      <div>
        <Row>
          <Col lg={2} xs={2}></Col>
            <Col lg={20} xs={20}>
                <h2>Mostrar Ventas</h2>
                {/*<TablaVentas />*/}
            </Col>
            <Col lg={2} xs={2}></Col>
          </Row>           
      </div>
  )
}

export default MostrarVenta;