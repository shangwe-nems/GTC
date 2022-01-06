import React from 'react';
import { Avatar, Steps, Row, Col, Button, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faCheckDouble, faQuestion, faTimes, faShoppingCart, faTag, faBullhorn, faSearchLocation, faExchangeAlt, faCogs, faTags, faShippingFast, faMapMarkerAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'


const { Step } = Steps;

export default function Position() {
    return (
        <Row style={{paddingLeft:30}}>
            <Col span={24} style>
                <div style={{width:"100%", display:"inline-flex", justifyContent:"space-between", alignItems:"center"}}>
                    <span>Location history of the current gem: </span>
                    <Button type="primary">+ Change location</Button>
                </div>
                <Divider />
            </Col>
            <Col span={24}>
                <Steps direction="vertical" size="default" current={1} status="process">
                    <Step title="Stone Proposition"
                        description={
                            <div style={{ fontSize:12}}>
                                <p style={{margin:1, marginBottom: 10}}>Here goes the description</p>
                                <Avatar src={require('../../../assets/img/no-user.jpg')} />   Giorgio Tarditi
                            </div>
                        }
                        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />} />
                    <Step title="Evaluation"
                        description={
                            <div style={{ fontSize:12}}>
                                <p style={{margin:1, marginBottom: 10}}>Here goes the description</p>
                                <Avatar src={require('../../../assets/img/no-user.jpg')} />   Giorgio Tarditi
                            </div>
                        }
                        icon={<FontAwesomeIcon icon={faMapMarkerAlt} />}
                    />
                    <Step title="Bargain"
                        description={
                            <div style={{ fontSize:12}}>
                                <p style={{margin:1, marginBottom: 10}}>Here goes the description</p>
                                <Avatar src={require('../../../assets/img/no-user.jpg')} />   Giorgio Tarditi
                            </div>
                        }
                        icon={<FontAwesomeIcon icon={faUserCircle} />}
                    />
                    
                </Steps>
            </Col>
        </Row>
    )
}
