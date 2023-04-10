import {Row, Col} from 'antd'
//import SignIn from '../components/SignIn'


export default function Home(){
    return(
        <Row>   
            <Col span={18}>
                <div>
                    <h1 lg={6} md={24} xs={24}>Home page de BettyStore</h1>
                    <h2>Página en construcción :)</h2>
                    <img className='homeEnDesarrollo' src='./assets/homePageEnDesarrollo.jpg'></img>
                </div>
            </Col>
            <Col span={6}>
                {/*<SignIn/>*/}
            </Col>
        </Row>     
    )
}
