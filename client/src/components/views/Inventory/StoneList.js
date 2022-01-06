import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { List, Avatar, Badge, message, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCheck, faCheckDouble, faQuestion, faTimes, faShoppingCart, faTag, faListAlt } from '@fortawesome/free-solid-svg-icons';
import { selectedGem } from '../../../_actions/inventory_actions';
import { GET_FILE_SERVER } from '../../Config';
import Batch from './Batch';
const moment = require('moment');



export default function StoneList({allGems}) {
    const dispatch = useDispatch();
    const current = useSelector(state => state.inventory.CURRENT_SELECTED_GEM);
    const settingsPercent = useSelector(state => state.inventory.SETTINGS);
    const user = useSelector(state => state.user.userData);
    const [visibleBatch, setvisibleBatch] = useState(false);
    const [currentBatch, setcurrentBatch] = useState(null);

    const handleSelect = (selected, groupId) => {
        dispatch(selectedGem(selected, groupId))
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

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div style={{paddingRight :5}}>
            {allGems.length > 0 ?
            allGems.map(batch => (
                <div key={batch._id} style={{width:"100%", display:"inline-flex", justifyContent:"center",alignItems:"center", height:"fit-content", borderTop:"2px solid #fafafa", borderBottom:"1px solid #fafafa" }} className="batch">
                    <span style={{width:"50%",height:"auto", transform: "rotate(270deg)", color:"#a6a6a6", fontFamily:"Menlo", fontSize:14, textAlign:"center", marginInline:-70}} className="batchData" onClick={() => {setvisibleBatch(true); setcurrentBatch(batch);}}>
                        {numberWithCommas(batch.total_weight)+" "} {batch.weight_unit}{"  "}<p style={{color:"green"}}>${numberWithCommas(calculateGrandTotal(batch.total_price).toFixed(0))}</p>
                    </span>
                    <div style={{margin:0, width:"100%", borderLeft:"2px solid #cacaca"}}>
                        <List
                            dataSource={batch.gems}
                            renderItem={item => (
                                <List.Item key={item._id} style={{ minHeight:"fit-content"}}>
                                    <div style={{ display: 'inline-flex', justifyContent:'space-between', alignItems:'center', width:'100%', backgroundColor: current !== undefined && current !== null ?  (current._id == item._id  ? "rgba(255, 255, 0, .3)" : null) : null }} onClick={() => handleSelect(item, batch._id)} >
                                        <div style={{display:'inline-flex', marginLeft:10, alignItems:"center"}}>
                                            <Badge count={item.sms} style={{background:'dodgerblue'}}>
                                                <Avatar src={item.description.images.length > 0 ? `${GET_FILE_SERVER.concat('/', item.description.images[0])}` : require('../../assets/img/default-no-image.png')} shape="square" size={78} style={{width:78, height: 78, borderRadius:4}}/>
                                            </Badge>
                                            <div style={{display:'flex', flexDirection:'column', height:75, marginLeft:20, justifyContent:"center", marginTop:8}}>
                                                <a style={{ margin: 0 }}>{item.stone_Id}</a>
                                                <div style={{ height: 'fit-content', display: 'inline-flex', alignItems:'baseline', marginTop: -10, padding: 0, fontFamily:"Menlo", color:"#cacaca"}}>
                                                    <h1 style={{ padding: 0, margin:0, marginRight: 5, fontSize: 40 }}>{item.measurements.individual_weight}</h1>
                                                    {/* <p style={{fontSize:16}}>{item.group ? "(" + item.group.total_weight + ")" : ""} </p> */}
                                                </div>
                                                <p style={{ fontSize: 12, marginTop: -13, padding: 0 }}>{moment(new Date(item.createdAt)).format('Do MMMM YYYY')}</p>
                                            </div>
                                        </div>
                                        <div style={{ width:100, height:78, alignSelf: 'stretch', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',  fontFamily:"Menlo" }}>
                                            {item.status === 'pending' ? (
                                                <FontAwesomeIcon icon={faQuestion} style={{ fontSize: 30, color:'rgba(166, 166, 166, .4)' }} />
                                            ) : item.status === 'bought' ? (
                                                <FontAwesomeIcon icon={faCheck} style={{ fontSize: 30, color:'#4CAF50' }} />
                                            ) : item.status === 'rejected' ?  (
                                                <FontAwesomeIcon icon={faTimes} style={{ fontSize: 30, color:'#F44336' }} />
                                            ) : (
                                                <FontAwesomeIcon icon={faCheckDouble} style={{ fontSize: 30, color:'#43F436' }} />
                                            )} 
                                            {item.purchase_payment.length > 0 ? (
                                                <p style={{ fontSize: 12, margin: 0 }}>
                                                    <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: 12 }} /> : ${item.purchase}
                                                </p>
                                            ): null}
                                            {item.sale_payment.length > 0 ? (
                                                <p style={{ fontSize: 12, margin: 0 }}>
                                                    <FontAwesomeIcon icon={faTag} style={{ fontSize: 12 }} /> : ${item.sale}
                                                </p>
                                            ) : null}
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            )) : (
                <div style={{width:"100%", height:"87vh", display:"grid", placeContent:"center", textAlign:"center"}}>
                    <span><FontAwesomeIcon icon={faListAlt} style={{fontSize:50}} /><br/>No data found</span>
                </div>
            )}

            <Modal
                visible={visibleBatch}
                onOk={() => setvisibleBatch(false)}
                onCancel={() => setvisibleBatch(false)}
                footer={null}
                width={650}
                destroyOnClose
            >
                <Batch data={currentBatch && currentBatch} />
            </Modal>
        </div>
    )
}
