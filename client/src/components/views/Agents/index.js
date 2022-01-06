import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Form, Row, Input, Button, Tabs, DatePicker, Modal, Select, Spin, Divider, Menu, Avatar } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faHome, faIdCardAlt, faLeaf, faLock, faUnlockAlt, faUserCheck, faUserCog, faUserLock, faUserTag, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';
import { LoadAllUsers } from '../../../hooks/users_hooks';

import Users from './Tabs/Users';

const { TabPane } = Tabs;

const { SubMenu } = Menu;

export default function Agents() {
    const [currentSelected, setcurrentSelected] = useState({});

    const [isLoading, users] = LoadAllUsers();

    const handleClick = (e) => {
        console.log('click', e)
    }

    return (
        <div>
            <Row>
                <Col span={24} style={{ borderRadius: 10, height: '100vh',  padding: 'auto `10px', boxShadow: '3px 3px 3px 3px rgba(202,200, 199, .5)', backgroundColor: '#fff' }}>
                    <Row>
                       <Col span={4} style={{height:"100vh"}}>
                           <h2 style={{color:"green", marginTop:20, marginLeft:30}}><FontAwesomeIcon icon={faUserCog} style={{marginRight:10}}/>Agents</h2>
                           {/* <Tabs defaultActiveKey="accounts" tabPosition="left" style={{ height: 220 }}>
                                <TabPane tab={<div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}><FontAwesomeIcon icon={faUserLock} style={{marginRight:10, fontSize: 48}} /><span>Accounts</span></div>} key="accounts">
                                    Content of tab Users
                                </TabPane>
                                <TabPane tab={<><FontAwesomeIcon icon={faUserTag} style={{marginRight:10}} />Partners</>} key="partners">
                                    Content of tab Users
                                </TabPane>
                                <TabPane tab={<><FontAwesomeIcon icon={faLock} style={{marginRight:10}} />Permissions</>} key="permissions"> 
                                    Content of tab Users
                                </TabPane>
                            </Tabs> */}
                           <Menu
                            onClick={(e) =>  handleClick(e)}
                            style={{width:"100%"}}
                            defaultSelectedKeys={['office_users']}
                            defaultOpenKeys={['sub1', 'sub2']}
                            mode="inline"
                           >
                                <SubMenu key="sub1" icon={<UserOutlined />} title="All users">
                                    <Menu.Item key="office_users"><FontAwesomeIcon icon={faUserLock} style={{marginRight:10}} />Accounts</Menu.Item>
                                    <Menu.Item key="field_users"><FontAwesomeIcon icon={faUserTag} style={{marginRight:10}} />Partners</Menu.Item>
                                </SubMenu>
                                <SubMenu key="sub2" icon={<LockOutlined />} title="All permissions">
                                    <Menu.Item key="core_permissions"><FontAwesomeIcon icon={faLock} style={{marginRight:10}} />Core Permissions</Menu.Item>
                                    <Menu.Item key="custom_permissions"><FontAwesomeIcon icon={faUnlockAlt} style={{marginRight:10}} />Custom Permissions</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Col> 
                       <Col span={6} style={{height:"100vh", backgroundColor:"#fafafa", padding:10}}>
                            <div style={{width:"100%", display:"inline-flex", padding:"5px 0px"}}>
                                <Input suffix={<SearchOutlined />} placeholder="Search..."/>
                                <Button type="primary" style={{marginLeft:"10px"}}>+ New User</Button>
                            </div>
                            <Divider style={{margin:"8px 0px", paddingRight:10}}/>
                            <div style={{height:"92vh", overflowY:"scroll", paddingRight:10}}>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Nehemie Shangwe</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Giorgio Tarditi</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserTimes} style={{fontSize:28, color:"red"}}/>
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Lucien Binja</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Nehemie Shangwe</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex" , height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Giorgio Tarditi</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Lucien Binja</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Nehemie Shangwe</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                <div style={{width:"100%", display:"inline-flex", justifyContent:'space-between'}} className="userItem">
                                    <div style={{display:"inline-flex", height:60, paddingTop:5}}>
                                        <Avatar src={require('../../assets/img/no-user.jpg')} size={50} /> 
                                        <div style={{height:50, marginLeft:20,  display:'flex', flexDirection:"column", justifyContent:"center"}}>
                                            <h3 style={{margin:0}}>Giorgio Tarditi</h3>
                                            <p style={{color:"dodgerblue", margin:0, fontSize:15}}>Administrator</p>
                                        </div>
                                    </div>
                                    <span style={{height:50, width:50, display:"grid", placeContent:"center"}}>
                                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:28, color:"green"}} />
                                    </span>
                                </div>
                                <Divider style={{margin:"5px 0px", paddingRight:5}}/>
                                
                            </div>
                        </Col> 
                       <Col span={14} style={{height:"100vh", backgroundColor:"#fff", padding:20, overflowY: "scroll"}}>
                           {/* <Users data={selectedData} /> */}
                        </Col> 
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
