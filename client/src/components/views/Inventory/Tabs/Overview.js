import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Descriptions, Menu, Select, Divider, Row, Col, Button, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faCheckDouble, faQuestion, faTimes, faShoppingCart, faTag, faTags } from '@fortawesome/free-solid-svg-icons'
import PurchaseGem from '../Forms/purchase_gem';
import SellGem from '../Forms/sell_gem';


const { Option } = Select;

export default function Overview({data}) {
    const [visiblePurchase, setvisiblePurchase] = useState(false);
    const [visibleSale, setvisibleSale] = useState(false);
    const settingsPercent = useSelector(state => state.inventory.SETTINGS);
    const user = useSelector(state => state.user.userData);

    

    
    const calculateGrandTotal = x => {
        
        let commission = user && user.agent_commission;
        let total = parseFloat(x);
        commission = parseFloat(commission);

        const office_Percent = parseFloat(settingsPercent && settingsPercent && settingsPercent.percents[0].office_percent);
        const partner_Percent = parseFloat(settingsPercent && settingsPercent && settingsPercent.percents[0].partner_percent);


        if(user && user.user_type && user.user_type.COMM) {
            return total + (total * office_Percent/100) + (total * partner_Percent/100) + (total * commission/100);
        }

        return total + (total * commission/100);
    }

    const calculateComm = (x, title) => {
        let commission = user && user.agent_commission;
        let total = parseFloat(x);
        commission = parseFloat(commission);

        const office_Percent = parseFloat(settingsPercent && settingsPercent && settingsPercent.percents[0].office_percent);
        const partner_Percent = parseFloat(settingsPercent && settingsPercent && settingsPercent.percents[0].partner_percent);
        
        if(title === "mediator")
            return (total * commission/100);
        if(title === "office")
            return (total * office_Percent/100);
        if(title === "partner")
            return (total * partner_Percent/100);
    }

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    

    return (
        <div>
            <Row gutter={5} style={{width: '100%', display:'inline-flex', justifyContent:'space-between', alignItems: 'center'}}>
                <Col span={16} >
                    <div style={{ display: 'flex', height: 'auto', alignItems: 'center', marginBottom: 20 }}>
                        <div style={{ flex: 1, display: 'inline-flex', height:"100%", alignItems: 'center' }}>
                            <div
                                style={{
                                    width: '100%',
                                    height: 100,
                                    marginTop: -18,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'left',
                                }}
                            >
                                <div style={{ width: 'fit-content', display: 'inline-flex', alignContent:'center', marginBottom: 0, fontFamily:"Lato" }}>
                                    <div style={{ marginRight: 10 }}>
                                        <h1 style={{ fontSize: 40, paddingTop: 30 }}>{data.measurements.weight_unit}</h1>
                                    </div>
                                    <span> </span>
                                    <div>
                                        <h1 style={{ fontSize: 60 }}>
                                            <b>{numberWithCommas(data.measurements.individual_weight)}</b>
                                        </h1>
                                    </div>
                                    <div style={{ marginLeft: 5 }}>
                                        <a href={null} >
                                            <p style={{ fontSize: 20, paddingTop: 17 }}>/{numberWithCommas(data.group.total_weight)} ({data.group.pieces})</p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={8}>
                    {data.status === 'pending' ? 
                        (
                            <div style={{alignItems: 'center',textAlign: 'center', padding: 0, width: '100%', marginTop: 5,marginBottom: 10}}>
                                <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 110, color:'rgba(166, 166, 166, .4)' }} /> 
                            </div>
                        ) : data.status === 'bought' ? (
                            <div style={{alignItems: 'center',textAlign: 'center', padding: 0, width: '100%', marginTop: 5,marginBottom: 10}}>
                                <FontAwesomeIcon icon={faCheck} style={{ fontSize: 110, color:'#4CAF50' }} /> 
                            </div>
                        ) : data.status === 'rejected' ?  (
                            <div style={{alignItems: 'center',textAlign: 'center', padding: 0, width: '100%', marginTop: 5,marginBottom: 10}}>
                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: 110, color:'#F44336' }} /> 
                            </div>
                        ) : (
                            <div style={{alignItems: 'center',textAlign: 'center', padding: 0, width: '100%', marginTop: 5,marginBottom: 10}}>
                                <FontAwesomeIcon icon={faCheckDouble} style={{ fontSize: 110, color:'#43F436' }} /> 
                            </div>
                        )
                    }
                </Col>
            </Row>
            {data.status !== 'rejected' ? 
            <React.Fragment>
                {data.purchase !== undefined ? (
                <Row >    
                    <Divider orientation="right">
                        <FontAwesomeIcon icon={faShoppingCart} /> Purchase (USD)
                    </Divider>
                    {user && user.commissionned ? (
                    <Descriptions size="small" layout="vertical" style={{ marginTop: -10 }}>
                        <Descriptions.Item label="Tot">
                            <p style={{ fontSize: 40, marginTop: -10 }}>
                                <b>{numberWithCommas(calculateGrandTotal(data.purchase.stone_cost.total_cost).toFixed(0))}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tot/unit">
                            <p style={{ fontSize: 40, marginTop: -10 }}>
                                <b>{numberWithCommas( (calculateGrandTotal(data.purchase.stone_cost.total_cost) / parseFloat(data.measurements.individual_weight)).toFixed(2))}</b>
                            </p>
                        </Descriptions.Item>
                    </Descriptions>) : null }

                    <Descriptions size="small" layout="vertical" style={{ marginTop: user && user.commissionned ? -40 : 20 }}>
                        <Descriptions.Item label="Price">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b>{numberWithCommas(data.purchase.stone_cost.total_cost)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Price/unit">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b>{numberWithCommas(data.purchase.stone_cost.unit_cost)}</b>
                            </p>
                        </Descriptions.Item>
                        {user && user.commissionned ? (
                            <Descriptions.Item label={`Mediator Comm (${user && user.agent_commission}%)`}>
                                <p style={{ fontSize: 28, marginTop: -5 }}>
                                    <b>{numberWithCommas(calculateComm(data.purchase.stone_cost.total_cost, 'mediator').toFixed(2))}</b>
                                </p>
                            </Descriptions.Item>): null}

                        {user && user && user.user_type.COMM ? (<React.Fragment>
                            <Descriptions.Item label={`Office Comm (${settingsPercent && settingsPercent && settingsPercent.percents[0].office_percent}%)`}>
                                <p style={{ fontSize: 28, marginTop: -5 }}>
                                    <b>{numberWithCommas(calculateComm(data.purchase.stone_cost.total_cost, 'office').toFixed(2))}</b>
                                </p>
                            </Descriptions.Item>
                            <Descriptions.Item label={`Partner Comm (${settingsPercent && settingsPercent && settingsPercent.percents[0].partner_percent}%)`}>
                                <p style={{ fontSize: 28, marginTop: -5 }}>
                                    <b>{numberWithCommas(calculateComm(data.purchase.stone_cost.total_cost, 'partner').toFixed(2))}</b>
                                </p>
                            </Descriptions.Item></React.Fragment>) : null}
                    </Descriptions>                    
                </Row>
                ) : (
                    <Row>
                        <Divider orientation="right">
                            <FontAwesomeIcon icon={faShoppingCart} /> Purchase (USD)
                        </Divider>
                        <Button onClick={() => setvisiblePurchase(true)} type="default" size="large" icon={<FontAwesomeIcon icon={faShoppingCart} style={{marginRight:10}} />} block style={{height:200, fontSize:18}}>Purchase the gem</Button>
                    </Row>
                )}

                {data.status === 'sold' ? (
                <Row style={{ marginTop: -20 }}>
                    <Divider orientation="left">
                        <FontAwesomeIcon icon={faTag} /> Sale (USD)
                    </Divider>
                    <Descriptions size="small" layout="vertical" style={{ textAlign: 'right',  marginTop: -10 }}>
                        <Descriptions.Item label="Tot">
                            <p style={{ fontSize: 40, marginTop: -10, textAlign: 'right' }}>
                                <b>4,750</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Tot/unit">
                            <p style={{ fontSize: 40, marginTop: -10 }}>
                                <b>110</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Profit (24%)">
                            <p style={{ fontSize: 40, marginTop: -10 }}>
                                <b>1,500</b>
                            </p>
                        </Descriptions.Item>
                    </Descriptions>
                    
                    <Descriptions size="small" layout="vertical" style={{ marginTop: -40, textAlign:"right" }} >
                        <Descriptions.Item label="Price" contentStyle={{textAlign:"end"}} labelStyle={{textAlign:"end"}}>
                            <p style={{ fontSize: 24, marginTop: -5 }}>
                                <b>4,500</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Price/unit">
                            <p style={{ fontSize: 24, marginTop: -5 }}>
                                <b>100</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Treatment">
                            <p style={{ fontSize: 24, marginTop: -5 }}>
                                <b>250</b>
                            </p>
                        </Descriptions.Item>
                    </Descriptions>              
                </Row> 
                ) : null}
            </React.Fragment> : null }

            <Modal
                visible={visiblePurchase}
                onOk={() => setvisiblePurchase(false)}
                onCancel={() => setvisiblePurchase(false)}
                width={600}
                footer={null}
            >
                <h2 style={{fontWeight: "lighter", color: "green"}}><FontAwesomeIcon icon={faShoppingCart} style={{marginRight:10}} /> Purchase the gem</h2>
                <p style={{color:"#a6a6a6", fontSize:14}}>This window allows the user to add the purchase data of the current gem and evaluate, and this is whether it came alone on in a batch. </p>
                <PurchaseGem />
            </Modal>
            <Modal
                visible={visibleSale}
                onOk={() => setvisibleSale(false)}
                onCancel={() => setvisibleSale(false)}
                width={800}
                footer={null}
            >
                <h2 style={{fontWeight: "lighter", color: "green"}}><FontAwesomeIcon icon={faTags} style={{marginRight:10}} /> Sell the gem</h2>
                <p style={{color:"#a6a6a6", fontSize:14}}>This window allows the user to add the sale data of the current gem and the buyer's information. </p>
                <SellGem />
            </Modal>
        </div>
    )
}
