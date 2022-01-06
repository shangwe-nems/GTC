import React from 'react';
import { Row, Col, Select, Avatar, Divider, Progress } from 'antd';
import { withRouter } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCalendarAlt, faLocationArrow, faUserAlt, faMapMarkedAlt, faMapMarkerAlt, faGem } from '@fortawesome/free-solid-svg-icons'
import './dashboard.css';

const moment = require('moment');

function Dashboard() {
    return (
        <div style={{ width: '100%' }}>
            <Row gutter={10} style={{display:'flex', alignItems:'center'}}>
                <Col span={18} style={{alignSelf:'stretch'}}>
                    <Row style={{ borderRadius: 10, height: '100%',  padding: '20px 30px', boxShadow: '3px 3px 3px 3px #ccc', backgroundColor: '#fff' }}>
                        <Col span={24} style={{marginBottom:20}}>
                            <div style={{ width:'100%', display:'inline-flex', justifyContent:'space-between', flexWrap:'wrap'}}>
                                <div style={{ width: '32%', borderRadius: 16, backgroundColor: '#D7EDD8', padding:'15px 18px', display:'inline-flex', alignItems:'center' }}>
                                    <div style={{width:'30%'}}>
                                        <img src={require('../../assets/img/cas.jpg')} alt="" style={{ width: '100%', height:'auto', borderRadius:'50%' }} />
                                    </div>
                                    <div style={{marginLeft:20}}>
                                        <h1 style={{fontSize: 14, margin: 0}}>Stones in stock</h1>
                                        <p style={{fontSize:26, margin: 0, padding: 0, color: '#EF4136'}}>258 stones</p>
                                        <p style={{ fontSize:12, margin: 0, paddding: 0}}>80% of stones are sold</p>
                                        <a style={{margin: 0, padding: 0}}>See the statistics</a>
                                    </div>
                                </div>
                                <div style={{ width: '32%', borderRadius: 16, backgroundColor: '#D7EDD8',  padding:'15px 18px', display:'inline-flex', alignItems:'center'  }}>
                                    <div style={{ width: '30%' }}>
                                        <img src={require('../../assets/img/bag.png')} alt="" style={{ width: '100%', height:'auto', borderRadius:'50%' }} />
                                    </div>
                                    <div style={{marginLeft:20}}>
                                        <h1 style={{fontSize: 14, margin: 0}}>Profit made on sales</h1>
                                        <p style={{fontSize:26, margin: 0, padding: 0, color: '#0062D1'}}>74%</p>
                                        <p style={{ fontSize:12, margin: 0, paddding: 0}}>20% of the profit is from gems</p>
                                        <a style={{margin: 0, padding: 0}}>See the statistics</a>
                                    </div></div>
                                <div style={{ width: '32%', borderRadius: 10, backgroundColor: '#D7EDD8', padding:'15px 18px', display:'inline-flex', alignItems:'center' }}>
                                    <div style={{ width: '30%' }}>
                                        <img src={require('../../assets/img/progress-bro.png')} alt="" style={{ width: '100%', height:'auto', borderRadius:'50%', backgroundColor:'#fff' }} />
                                    </div>
                                    <div style={{marginLeft:20}}>
                                        <h1 style={{fontSize: 14, margin: 0}}>Our agents</h1>
                                        <p style={{fontSize:32, margin: 0, padding: 0, color: '#EF4136'}}>85 agents </p>
                                        <p style={{ fontSize:12, margin: 0, paddding: 0}}>34 active agents recorded</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div style={{ width:'100%', marginBottom:20}}>
                                <h1 style={{ fontSize: 24, color: '#828282' }}>Monthly stats of our the business</h1>
                            </div>
                            {/* <MixedChart />    */}
                            <span>here goes a chart</span>
                        </Col>
                        
                    </Row>
                </Col>
                
                 <Col span={6} style={{alignSelf:'stretch'}}>
                    <div style={{borderRadius:10, height:'100%', padding: '20px 10px', boxShadow:'3px 3px 3px 3px #ccc', backgroundColor:'#fff'}}>
                        <Row style={{display:'flex', flexDirection:'row', alignItems:'center', margin:0, padding:0, marginBottom:20}}>
                            <img src={require('../../assets/img/logo.png')} alt="" style={{ maxWidth: '30%', height: 'auto', marginRight:10  }} />
                            <div>
                                <h1 style={{ fontSize: 16 }}>GEM TRADERS COMPANION</h1>
                                <p style={{ fontSize: 12 }}>Commissions de vendeurs de pierres precieuses</p>
                            </div>
                        </Row>
                        
                        <Row style={{ background: '#D7EDD8', borderRadius:10, padding:10 }}>
                            <div>
                                <h1 style={{ fontSize: 18, color: '#828282', margin: 0 }}>Current states of stones in the system</h1>
                                <p style={{fontSize:12}}>The gem stones undergoes a different set of statuses in the system to determine their destination</p>
                                <div style={{marginTop: 20, padding:0}}>
                                    {/* <PieChart /> */}
                                    <span>Here goes a chart</span>
                                </div>
                            </div>
                        </Row>

                        <Row style={{ marginTop: 10, padding:"10px 5px 0px 5px" }}>
                            <div>
                                <h1 style={{ fontSize: 18, color: '#828282', margin: 0 }}>Last added stones</h1>
                                <div style={{marginTop: 20, padding:0, width:'100%'}}>
                                    <div style={{display:'inline-flex'}}>
                                        <Avatar src={require('../../assets/img/quantity.jpg')} shape="square" style={{width:70, height: 70, marginRight:20}}/>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <a style={{margin:0}}>200104b00059</a>
                                            <div style={{ height: 'fit-content', display: 'inline-flex', alignItems:'baseline', marginTop: -10, padding: 0}}>
                                                <h1 style={{ padding: 0, marginRight:5, fontSize:32 }}>57</h1>
                                                <p>(125)</p>
                                            </div>
                                            <span style={{fontSize:12, marginTop: -21, padding: 0}}>Added on {moment(new Date('2021-07-05')).format('MMMM Do YYYY')}</span>
                                        </div>
                                    </div>
                                    
                                    <Divider style={{ margin: '5px 0px 8px 0px' }} />

                                    <div style={{display:'inline-flex'}}>
                                        <Avatar src={require('../../assets/img/quantity.jpg')} shape="square" style={{width:70, height: 70, marginRight:20}}/>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <a style={{margin:0}}>200104b00059</a>
                                            <div style={{ height: 'fit-content', display: 'inline-flex', alignItems:'baseline', marginTop: -10, padding: 0}}>
                                                <h1 style={{ padding: 0, marginRight:5, fontSize:32 }}>43</h1>
                                                <p>(125)</p>
                                            </div>
                                            <span style={{fontSize:12, marginTop: -21, padding: 0}}>Added on {moment(new Date('2021-07-02')).format('MMMM Do YYYY')}</span>
                                        </div>
                                    </div>

                                    <Divider style={{ margin: '5px 0px 8px 0px' }} />

                                    <div style={{display:'inline-flex'}}>
                                        <Avatar src={require('../../assets/img/quantity.jpg')} shape="square" style={{width:70, height: 70, marginRight:20}}/>
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <a style={{margin:0}}>200104b00059</a>
                                            <div style={{ height: 'fit-content', display: 'inline-flex', alignItems:'baseline', marginTop: -10, padding: 0}}>
                                                <h1 style={{ padding: 0, marginRight:5, fontSize:32 }}>25</h1>
                                                <p>(125)</p>
                                            </div>
                                            <span style={{fontSize:12, marginTop: -21, padding: 0}}>Added on {moment(new Date('2021-07-02')).format('MMMM Do YYYY')}</span>
                                        </div>
                                    </div>

                                    <Divider style={{ margin: '5px 0px 8px 0px' }} />
                                    <div style={{textAlign:'center'}}>
                                        <a>See more...</a>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default withRouter(Dashboard);