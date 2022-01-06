import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, message, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faGem, faInfoCircle, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PlusOutlined } from '@ant-design/icons';
import { addNewGem } from '../../../../_actions/inventory_actions';

const {TextArea} = Input;

export default function New_gem({onCreateSuccess}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [saveLoading, setsaveLoading] = useState(false);

    const formItemLayout = {
        labelCol: {span: 8 },
        wrapperCol: {span: 14},
    };
      
    const onFinish = values => {
        setsaveLoading(true);
        
        setTimeout(() => {
            dispatch(addNewGem(values))
                .then(response => {
                    if(response.payload) {
                        message.success("Gems added successfully...");
                        form.resetFields();
                        onCreateSuccess();
                    }
                })
                .catch(err => {
                    console.error(err);
                    message.error("Failed to add gems");
                })
        }, 2000);

    };
      

    return (
        <div>
            <Form 
            form={form} 
            initialValues={{name:"Tourmaline"}} 
            // {...formItemLayout} 
            layout="horizverticalontal" 
            onFinish={onFinish} 
            autoComplete="off"
            >
                <fieldset>
                    <legend>
                        <FontAwesomeIcon icon={faAddressCard} style={{ marginRight: 10 }} />Information concerning the batch of gems
                    </legend>
                </fieldset>
                <Row gutter={10}>
                    {/* <Col span={}></Col> */}
                </Row>
                <Form.Item labelCol={{ span :4}} wrapperCol={{span:16}} name="total_weight" label="Total weight">
                    <Input type="number" placeholder="Insert the total weight of all the gems..." />
                </Form.Item>
                <fieldset style={{fontSize:18, FontWeight:"bold", marginBottom: 30}}>
                    <legend>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 10 }} />Information each individual gems
                    </legend>
                </fieldset>
                <Row gutter={5}>
                    <Form.List 
                        name="stones"
                        rules={[
                            {
                                validator: async (_, stones) => {
                                    if(!stones || stones.length < 1) {
                                        return Promise.reject(new Error('At least one gem!'));
                                    }
                                }
                            }
                        ]}
                    >
                        {(fields, { add, remove }, {errors}) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                <Col span={12} key={key} style={{display:"flex", width:"100%", flexDirection:"column"}}>
                                    <legend style={{width:"100%", display:"inline-flex", justifyContent:"space-between", alignItems:"center"}}>
                                        <span><FontAwesomeIcon icon={faGem} style={{ marginRight: 10 }} />Gem No {" "}{index+1}</span>
                                        <span><FontAwesomeIcon icon={faTimesCircle} style={{color:"red"}} onClick={() => remove(name)} /></span>
                                    </legend>
                                    <Form.Item
                                        {...restField}
                                        initialValue="Tourmaline"
                                        name={[name, 'name']}
                                        label="Gem Nature"
                                        fieldKey={[fieldKey, 'name']}
                                        rules={[{ required: true, message: 'Nature of the Gem' }]}
                                    >
                                        <Input placeholder="Nature of the gem..." />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label="Details"
                                        
                                        name={[name, 'details']}
                                        fieldKey={[fieldKey, 'details']}
                                        rules={[{ required: false }]}
                                    >
                                        <TextArea placeholder="Details of the stone" autoSize={{ minRows: 3, maxRows: 5 }} />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        label="Intividual weight"
                        
                                        name={[name, 'individual_weight']}
                                        fieldKey={[fieldKey, 'individual_weight']}
                                        rules={[{ required: true, message: 'Missing individual weight' }]}
                                    >
                                        <Input type="number" placeholder="Weight of the gem" />
                                    </Form.Item>
                                    
                                </Col>
                            ))}
                            <Col span={12} style={{display:"grid", placeContent:"center"}}>
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{height:258, width:420}}>
                                        Add Gem
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </Col>
                            
                        </>
                        )}
                        </Form.List>
                    </Row>
                    <Form.Item>
                        <Button loading={saveLoading} type="primary" htmlType="submit">
                            <FontAwesomeIcon icon={faSave} style={{marginRight:10}} />Save batch of Gems
                        </Button>
                    </Form.Item>
                </Form>
        </div>
    )
}
