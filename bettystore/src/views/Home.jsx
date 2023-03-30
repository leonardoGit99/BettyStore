import {Row, Col} from 'antd'
//import SignIn from '../components/SignIn'


export default function Home(){
    return(
        <Row>   
            <Col span={18}>
                <div>
                    <h1>Sistema de punto de venta para administrar una tienda de barrio</h1>
                    <p>Parrafo de prueba</p>
                </div>
            </Col>
            <Col span={6}>
                {/*<SignIn/>*/}
            </Col>
        </Row>     
    )
}
