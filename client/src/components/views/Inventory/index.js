import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Col, Form, Row, Input, Button, DatePicker, Modal, Select, Spin, Divider } from 'antd'
import StoneList from './StoneList';
import ImageSlider from './ImageSlider';
import DataTabs from './DataTabs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faSearch, faQuestion, faTimes, faCheck, faCheckDouble, faGem, faJoint, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import New_gem from './Forms/New_gem';
import { LoadAllGems } from '../../../hooks/gem_hooks';
import { LoadAllSettings } from '../../../hooks/setting_hooks';
import { LoaderComponentContainer, LoaderComponentList } from '../../../hoc/LoaderComponent';
import Add_Batch from './Forms/Add_Batch';
const moment = require('moment');

const {Search} = Input;
const {RangePicker} = DatePicker;

const { Option } = Select;

export default function Inventory() {
    const [form] = Form.useForm();
    const [visibleNewBatch, setvisibleNewBatch] = useState(false);
    const [currentSelected, setcurrentSelected] = useState(null);

    const current = useSelector(state => state.inventory.CURRENT_SELECTED_GEM);

    const allGems = useSelector(state => state.inventory.ALL_GEMS);
    const [isLoading, gems] = LoadAllGems();
    const settings  = LoadAllSettings();
    const [loading, setloading] = useState(false);

    
    const onSearch = value => console.log(value);

    useEffect(() => {
        setloading(true);
        setcurrentSelected(current);
        setloading(false);
    }, [current])

    return (
        <div>
            <Row>
                <Col span={24} style={{ borderRadius: 10, height: '100%',  padding: 'auto 10px', boxShadow: '3px 3px 3px 3px rgba(202,200, 199, .5)', backgroundColor: '#fff' }}>
                    <Row gutter={10}>
                        <Col span={24}>
                            <div style={{ backgroundColor: "rgba(58, 162, 237, .1)", height:50, width:"100%", borderRadius:10, border: '1px solid rgba(58, 162, 237, .3)', boxShadow: '3px 3px 3px 3px rgba(202,200, 199, .5)', marginBottom: 20, padding:"0px 20px", display: "inline-flex", justifyContent:"space-between", alignItems:'center' }}>
                                <Form layout="inline" style={{marginTop:14}}>
                                    <Form.Item label="Filter by status: " >
                                        <Select defaultValue="all" style={{ width: 150 }} bordered={true} placeholder="<Select status>">
                                            <Option value="all">
                                                <FontAwesomeIcon icon={faGem} style={{ color:'#cacaca' }} /> All stones
                                            </Option>
                                            <Option value="pending">
                                                <FontAwesomeIcon icon={faQuestion} style={{ color:'#A6A6A6' }} /> Pending...
                                            </Option>
                                            <Option value="rejected">
                                                <FontAwesomeIcon icon={faTimes} style={{ color:'#F44336' }} /> Rejected
                                            </Option>
                                            <Option value="bought">
                                                <FontAwesomeIcon icon={faCheck} style={{ color:'#4CAF50' }} /> Purchased
                                            </Option>
                                            <Option value="sold">
                                                <FontAwesomeIcon icon={faCheckDouble} style={{ color:'#43F436' }} /> Sold
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="by gem type: "><Input /></Form.Item>
                                    <Form.Item label="by date: "><RangePicker /></Form.Item>
                                    <Form.Item>
                                        <Button type="default" shape="circle" icon={<FontAwesomeIcon icon={faSearch} />}/>
                                    </Form.Item>
                                </Form>
                                
                                <span>
                                    <Button type="primary" size="large" shape="round" onClick={() => setvisibleNewBatch(true)}><FontAwesomeIcon icon={faCartPlus} style={{marginRight:10, marginTop:-5, fontSize: 18 }} /> Add gem batch</Button> 
                                    <Button type="primary" size="large" shape="round" onClick={() => setvisibleNewBatch(true)} style={{ marginLeft:10, backgroundColor:"green"}}><FontAwesomeIcon icon={faCartPlus} style={{marginRight:10, marginTop:-5, fontSize: 18 }} /> Sell Gems</Button> 
                                </span>
                                
                            </div>
                        </Col>
                        <Col span={7}>
                            <div style={{width:"100%", marginBottom:20, boxShadow: '3px 3px 3px 3px rgba(202,200, 199, .5)', padding:"10px 20px 20px 20px"}}>
                                <div style={{marginBottom:5}}>Input Stone Code :</div>
                                <Search placeholder="Input search code" allowClear onSearch={onSearch} />
                            </div>
                            <Spin indicator={<LoaderComponentList />} spinning={gems && allGems ? isLoading : true} >
                                <div style={{ borderRadius: 10, padding:'0px 0px 20px 5px', height:900, overflowY:'scroll' }}> 
                                    <StoneList allGems={gems && allGems ? allGems : gems} />
                                </div>
                            </Spin>
                            
                        </Col>
                        <Col span={17} style={{height: 800, alignSelf:'stretch'}}>
                            <Spin indicator={<LoaderComponentContainer />} spinning={loading}>
                                {currentSelected !== undefined && currentSelected !== null ? 
                                    <Row gutter={10} style={{height:'100%' }} justify="space-between">      
                                        <Col className="container" style={{ height: '100%', marginLeft: 15, textAlign:"center" }} span={9}>
                                            <div style={{backgroundColor:'#D5EDD9', borderRadius:10, border:'1px solid  rgba(135, 201, 138, .3)',  boxShadow: '3px 3px 3px 3px rgba(202,200, 199, .5)', padding:"10px 20px", textAlign:'center'}}>
                                                <p style={{ padding: 0, margin: "4px 2px", fontSize:24 }}><b>{currentSelected.stone_Id}</b></p>
                                                <p style={{ padding: 0, margin: 2, fontSize:12 }}>{moment(new Date(currentSelected.createdAt)).format('Do MMMM YYYY')}</p>
                                                <p style={{padding:0, margin:0, marginTop:5}}>{currentSelected.description.nom}</p>
                                            </div>
                                            <div>
                                                <ImageSlider stoneID={currentSelected.stone_Id} imageFiles={currentSelected.description.images} videoFiles={currentSelected.description.videos}/>
                                            </div>
                                           
                                        </Col>

                                        <Col className="container" span={14} style={{ padding:'0px 15px', marginLeft:2}}>
                                            <DataTabs data={currentSelected} />
                                        </Col>
                                    </Row>
                                 : <div style={{width: "100%", height:1008, display:"grid", placeContent: 'center'}}>
                                     <img src={require('../../assets/img/logo.png')} />
                                    </div>}
                            </Spin>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Modal
                visible={visibleNewBatch}
                onCancel={() => setvisibleNewBatch(false)}
                onOk={() => setvisibleNewBatch(false)}
                footer={null}
                width={1400}
                destroyOnClose={true}
            >
                <h2 style={{fontWeight: "lighter", color: "green", fontSize:28}}><FontAwesomeIcon icon={faCartPlus} style={{marginRight:10}} /> New batch of Gems</h2>
                <p style={{color:"#a6a6a6", fontSize:14}}>This window allows the user to add new gems in the system, and this is regardless of whether it came as a batch or alone. </p>
                {/* <New_gem onCreateSuccess={() => setvisibleNewBatch(false)}/> */}
                <Add_Batch onCreateSuccess={() => setvisibleNewBatch(false)}/>
            </Modal>
        </div>
    )
}
