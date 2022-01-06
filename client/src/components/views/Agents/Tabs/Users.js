import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Form, Row, Input, Button, Tabs, Modal, Select, Spin, Divider, Menu, Avatar, Switch } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCheck, faHome, faLeaf, faTimes, faUserCheck, faUserCog, faUserLock, faUserTag, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { UserOutlined, SearchOutlined, LockOutlined } from '@ant-design/icons';

const roles = [
    {value: "Administrator", label: "Administrator"},
    {value: "Super Administrator", label: "Super Administrator"},
    {value: "field Agents", label: 'Field Agent'},
    {value: "Gem Analyst", label: 'Gem Analyst'}
]

export default function Users() {
    const [user_type, setuser_type] = useState({});

    // const [isLoading, users] = LoadAllUs

    return (
        <div>
            <h1 style={{color:"green"}}><FontAwesomeIcon icon={faUserCog} /> User Profile</h1>
            <Row style={{marginTop:20, border:"1px solid #eaeaea", padding:"20px 30px", borderRadius:4}}>
                <Col span={4}>
                    <Avatar src={require('../../../assets/img/no-user.jpg')} size={120}/>
                </Col>
                <Col span={16} style={{paddingLeft:20}}>
                    <h2 style={{margin:0}}>Nehemie Shangwe</h2>
                    <p style={{margin:0, marginBottom:10, fontSize:14}}>shangwe.nehms@gmail.com</p>
                    <p style={{margin:0, color: "#a6a6a6"}}>IT Manager</p>
                    <p style={{margin:0, color:"dodgerblue"}}>Role : <b>Administrator</b></p>
                    
                </Col>
                <Col span={4}>
                    <div>
                        <FontAwesomeIcon icon={faUserCheck} style={{fontSize:75, color:"green", marginBottom:10}}  /> <br/>
                        <Switch checkedChildren="Actived" unCheckedChildren="Disabled" defaultChecked />
                    </div>
                </Col>
            </Row>
            <Row style={{marginTop:14, border:"1px solid #eaeaea", padding:"10px 30px", borderRadius:4}}>
                <Col span={24} style={{display:"inline-flex", alignItems:"center"}}>
                    <b style={{fontSize:21, color:"dodgerblue", marginRight:10}}>10%</b>   Commission on stones
                </Col>
            </Row>
            <Row style={{marginTop:14, border:"1px solid #eaeaea", padding:"20px 30px", borderRadius:4}}>
                <Col span={24}>
                    <h3 style={{color:"green", marginBottom:15}}><FontAwesomeIcon icon={faUserLock} style={{marginRight:10}} /> User Permissions</h3>
                    <p style={{color:"#b6b6b6", marginBottom:20, fontSize:13}}>The current user is bound by a particular set of instructions that allows him to perform a set of actions in the system. These permissions are grouped by roles which encapsulates the different permissions bound to the particular user account.</p>
                    <Form layout="inline">
                        <Form.Item>
                            <Select options={roles} placeholder="< Select Role >" style={{width: 300}}/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">Validate</Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={24} style={{marginTop:10, border: "1px solid #eaeaea", borderRadius:4, padding:20}}>
                    <p>Permissions list for Role <b>Administrator</b></p>
                    <div style={{paddingLeft:15}}>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Access all the gems and their information.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Access all the different user's commissions on purchased gems.</p>

                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new permission profile for users.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} View the list of permission's profile of different users.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Modify a created permission profile for users.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Delete a created permission profile for users.</p>

                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Access all the settings</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new location of gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new mesure units</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Modify office percentage on the purchased stones.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create a new gem supplier.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create a new gem client.</p>

                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Update location of gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Update mesure units</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Update gem supplier.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} UPdate gem client.</p>

                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new user account in system.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} View all the users and their information.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Update a user account's information.</p>

                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert new Gem in the system.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Fill gem information about particular gem.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert images of different created gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert videos for different created gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Change gem status of a gem</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert purchase information</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert treatment information for a particular gem.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Change stone location information.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create shares on a sold stone.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} View all inserted gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new location of gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create new mesure units</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Modify office percentage on the purchased stones.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Create a new gem supplier.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Delete an inserted Gem</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert payment on batch of purchased gems.</p>
                        <p style={{color:"#a66a6a", fontSize:14, margin: 0}}>{user_type.ALL ? <FontAwesomeIcon icon={faCheck} style={{color:"dodgerblue", marginRight:10, fontSize:16}} /> : <FontAwesomeIcon icon={faTimes} style={{color:"red", marginRight:10, fontSize:16}} />} Insert payment on batch of sold gems.</p>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
