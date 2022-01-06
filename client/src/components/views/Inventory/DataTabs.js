import React from 'react';
import { Tabs } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMapMarkerAlt, faInfoCircle, faSearchPlus, faTag } from '@fortawesome/free-solid-svg-icons'
import Overview from './Tabs/Overview';
import WMT from './Tabs/WMT';
import Purchase from './Tabs/Purchase';
import Position from './Tabs/Position';
import './slider.css';
import Sales from './Tabs/Sales';

const { TabPane } = Tabs;


export default function DataTabs({data}) {
    return (
        <div>
            <Tabs defaultActiveKey="1" tabPosition="top" centered={true}>
                <TabPane
                    tab={
                        <span style={{display:"flex", flexDirection:'column', alignItems:'center', fontSize:12, fontWeight:300}}><FontAwesomeIcon icon={faSearchPlus} style={{fontSize:32, marginBottom:5}} /> Overview</span>
                    }
                    key="1"
                >
                    <Overview data={data}/>
                </TabPane>
                <TabPane
                    tab={
                        <span style={{display:"flex", flexDirection:'column', alignItems:'center', fontSize:12, fontWeight:300}}><FontAwesomeIcon icon={faInfoCircle} style={{fontSize:32, marginBottom:5}} /> W M & T</span>
                    }
                    key="2"
                >
                    <WMT data={data}/>
                </TabPane>
                {data.status === 'rejected' ? null : 
                <TabPane
                    tab={
                        <span style={{display:"flex", flexDirection:'column', alignItems:'center', fontSize:12, fontWeight:300}}><FontAwesomeIcon icon={faShoppingCart} style={{fontSize:32, marginBottom:5}} /> Purchase</span>
                    }
                    key="3"
                >
                    <Purchase data={data}/>
                </TabPane>
                }
                <TabPane
                    tab={
                        <span style={{display:"flex", flexDirection:'column', alignItems:'center', fontSize:12, fontWeight:300}}><FontAwesomeIcon icon={faMapMarkerAlt} style={{fontSize:32, marginBottom:5}} /> Position</span>
                    } 
                    key="4"
                >
                    <Position data={data}/>
                </TabPane>
                {data.status === 'rejected' ? null : 
                <TabPane
                    tab={
                        <span style={{display:"flex", flexDirection:'column', alignItems:'center', fontSize:12, fontWeight:300}}><FontAwesomeIcon icon={faTag} style={{fontSize:32, marginBottom:5}} /> Sale</span>
                    }
                    key="5"
                >
                    <Sales data={data}/>
                </TabPane>
                }
            </Tabs>
        </div>
    )
}
