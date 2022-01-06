import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Col, Descriptions, Divider, Row, Avatar, Button, Select } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCheck, faQuestion, faTimes, faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { GET_FILE_SERVER } from '../../Config';
import { changeStatus, setCurrentBatch } from '../../../_actions/inventory_actions';

const { Option } = Select;

export default function Batch({data}) {
    const dispatch = useDispatch();
    const settingsPercent = useSelector(state => state.inventory.SETTINGS);
    const [status, setstatus] = useState(data.status);
    const user = useSelector(state => state.user.userData);

    useEffect(() => {
        setstatus(data.status);
        dispatch(setCurrentBatch(data._id));
    })


    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

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

    const handleChange = (e, item) => {
        console.log("heoo = ", e, item);
        dispatch(changeStatus(item._id, {action: 'change_status', data : {status: e}})).then(result => {
            console.log(result);
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <h2 style={{color:"green", fontWeight:600}}><FontAwesomeIcon icon={faInfoCircle} /> Overview</h2>
            <p style={{color:"#a6a6a6", fontSize:13}}>This window gives an overview of the information concerning the different gems contained in the batch.</p>
            <Row>
                <Col span={24}>
                    <Button type="primary" style={{ float:"right"}}>+ Add Payment</Button>
                    <Divider orientation="left">
                        <FontAwesomeIcon icon={faInfoCircle} /> Batch Info
                    </Divider>
                    <Descriptions size="small" layout="vertical" style={{marginTop:10}}>
                        <Descriptions.Item label="Batch Tot. Weight">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b> <span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.weight_unit}</span>{numberWithCommas(data.total_weight)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Batch pieces">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b>{numberWithCommas(data.pieces)}<span style={{fontSize:18, fontWeight:"lighter", marginLeft:5}}>pcs</span></b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Gem Variety">
                            <p style={{ fontSize: 18, marginTop: -5 }}>
                                <b>{data.gem_variety}</b>
                            </p>
                        </Descriptions.Item>
                        
                        <Descriptions.Item label="Tot Price">
                            <p style={{ fontSize: 28, marginTop: -5, color:"green" }}>
                                <b>{numberWithCommas(calculateGrandTotal(data.total_price).toFixed(0))}</b>
                            </p>
                        </Descriptions.Item>

                        <Descriptions.Item label="Tot Paid">
                            <p style={{ fontSize: 28, marginTop: -5, color:"dodgerblue" }}>
                                <b>{numberWithCommas(0)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Seller's name">
                            <p style={{ fontSize: 16, marginTop: -5 }}>
                                {data.gem_variety}
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Details" style={{marginTop:-50}}>
                            <p style={{ fontSize: 14, marginTop: -5, color:"#a6a6a6" }}>
                                {data.purchase_note}
                            </p>
                        </Descriptions.Item>  

                    </Descriptions>
                    <Divider orientation="left">
                        <FontAwesomeIcon icon={faInfoCircle} /> Gems Overview
                    </Divider>
                    <div style={{height:180, overflowY: "scroll"}}>
                    {data.gems.map((item, index) => (
                        <div key={item.stone_Id} style={{ width:"100%", display:"inline-flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid #f1f1f1"}}>
                            <div style={{display:"inline-flex", alignItems:"center", justifyContent:"space-between"}}>
                                <div  style={{display:"grid", placeContent:"center", width:70, height:70, border:"1px dashed #a6a6a6", padding:"5px 5px 5px 5px",  margin:5, borderRadius:8, marginRight:15}}>
                                    <Avatar src={item.description.images.length > 0 ? `${GET_FILE_SERVER.concat('/', item.description.images[0])}` : require('../../assets/img/default-no-image.png')} shape="square" size={60} style={{width:60, height: 60, borderRadius:4}}/>
                                </div>
                                <span style={{marginTop: 7}}>
                                    <p style={{ fontSize: 32, margin: 0 }}>
                                        <b><span style={{fontSize:20, fontWeight:"lighter", marginRight:5}}>{item.measurements.weight_unit}</span>{numberWithCommas(item.measurements.individual_weight)}</b>
                                    </p>
                                    <p style={{color:"dodgerblue"}}>{item.stone_Id}</p>
                                </span>
                            </div> 
                            <div style={{paddingRight:20}}>
                                <Select defaultValue={item.status} style={{ width: 75 }} bordered={false} onChange={(e) => handleChange(e, item)}>
                                    <Option value="pending">
                                        <FontAwesomeIcon icon={faQuestion} style={{ color:'#A6A6A6', fontSize:30 }} />
                                    </Option>
                                    <Option value="rejected">
                                        <FontAwesomeIcon icon={faTimes} style={{ color:'#F44336', fontSize:30 }} />
                                    </Option>
                                    {/* <Option value="bought">
                                        <FontAwesomeIcon icon={faCheck} style={{ color:'#4CAF50', fontSize:30 }} />
                                    </Option> */}
                                    {/* <Option value="sold">
                                        <FontAwesomeIcon icon={faCheckDouble} style={{ color:'#43F436', fontSize:30 }} />
                                    </Option> */}
                                </Select>
                           </div>
                        </div>
                    ))}
                    </div>
                    
                </Col>
            </Row>
        </div>
    )
}
