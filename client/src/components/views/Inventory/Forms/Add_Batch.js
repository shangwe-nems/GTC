import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, message, Col, Select, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faGem, faInfoCircle, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PlusOutlined } from '@ant-design/icons';

import { addNewGem } from '../../../../_actions/inventory_actions';

const {TextArea} = Input;

const formItemLayout = {
    labelCol: {span: 6 },
    wrapperCol: {span: 12},
};

const gemOptions = [
    {label:"Tourmaline", value:"Tourmaline"},
    {label:"Quartz", value:"Quartz"},
    {label:"Diamond", value:"Diamond"},
    {label:"Ametrine", value:"Ametrine"},
    {label:"Azurite", value:"Azurite"},
    {label:"Topaz", value:"Topaz"},
    {label:"Emerald", value:"Emerald"},
    {label:"Sapphire", value:"Sapphire"},
    {label:"Fluorite", value:"Fluorite"},
    {label:"Malachite", value:"Malachite"},
    {label:"Opal", value:"Opal"},
    {label:"Zircon", value:"Zircon"},
];

const weightOptions = [
    {label:"Gram", value:"g"},
    {label:"Kilogram", value:"kg"},
    {label:"Carat", value:"kt"},
    {label:"Pound", value:"lb"},
];

const lengthOptions = [
    {label:"Millimeter", value:"mm"},
    {label:"Centimeter", value:"cm"},
]

export default function Add_Batch({onCreateSuccess}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [saveLoading, setsaveLoading] = useState(false);
    const [currentUnit, setcurrentUnit] = useState("g");
    const [currentLengthUnit, setcurrentLengthUnit] = useState("mm");
    const [lastInput, setlastInput] = useState("");
    const [commissionPercent, setcommissionPercent] = useState(10);

    const handleFinish = values => {
        setsaveLoading(true);
        console.log("Validated: ", values);
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

    const handleConvertPrice = (e, keyId) => {
        let value = e.target.value;
        let total = value * parseFloat(form.getFieldValue('total_weight'));
        let unit = value / parseFloat(form.getFieldValue('total_weight'));

        let unitCost  =  parseFloat(form.getFieldValue('price_per_unit'));
        let totalCost  =  parseFloat(form.getFieldValue('total_price'));

        if(keyId !== 'total_weight') {
            setlastInput(keyId);
        }

        switch (keyId) {
            case "price_per_unit":
                form.setFieldsValue({total_price: total.toFixed(2)});
                break;
            case "total_price":
                form.setFieldsValue({price_per_unit: unit.toFixed(2)});
                break;
            case "total_weight":
                lastInput === "price_per_unit" ? form.setFieldsValue({total_price: (unitCost * value).toFixed(2)}) : form.setFieldsValue({price_per_unit: (totalCost / value).toFixed(2)})
                break;
            default:
                break;
        }
    }

    const handleIndividualPrice = (e, keyId, index) => {
        
        const fields = form.getFieldsValue()
        const { stones } = fields;

        const data = form.getFieldValue('stones')[index];
        let indWeight = parseFloat(data.individual_weight);
        let unitPrice = parseFloat(data.unit_cost);
        let totalCost = parseFloat(data.total_cost);
        
        // let value = e.target.value;

        let total = unitPrice * indWeight;
        let unit = totalCost / indWeight;
        
        let commission = total * (commissionPercent / 100);
        let grand_total = commission + total;

        switch (keyId) {
            case 'unit_cost':
                Object.assign(stones[index], { total_cost : total.toFixed(2) || 0, commission: commission.toFixed(2) || 0, grand_total: grand_total.toFixed(2) || 0 })
                break;
            case 'total_cost':
                let comm = totalCost * (commissionPercent / 100);
                let grand = totalCost + comm;
                Object.assign(stones[index], { unit_cost : unit.toFixed(2) || 0, commission: comm.toFixed(2) || 0, grand_total: grand.toFixed(2) || 0 })
                break;
            case 'individual_weight':
                Object.assign(stones[index], { total_cost : total.toFixed(2) || 0, commission: commission.toFixed(2) || 0, grand_total: grand_total.toFixed(2) || 0 })
                break;
            default:
                break;
        }

        form.setFieldsValue({ stones })

        computedSums();

    }

    const computedSums = () => {
        const fields = form.getFieldsValue()
        const { stones } = fields;

        let weightArray = stones.map(stone => parseFloat(stone.individual_weight));
        let sumWeight = weightArray.reduce((a,b) => a + b, 0);
        form.setFieldsValue({total_weight: sumWeight})

        let priceArray = stones.map(stone => parseFloat(stone.total_cost));
        let sumCost = priceArray.reduce((a,b) => a + b, 0);
        form.setFieldsValue({total_price: sumCost});

        let grandTotalArray = stones.map(stone => parseFloat(stone.grand_total));
        let sumGrand = grandTotalArray.reduce((a,b) => a + b, 0);
        form.setFieldsValue({grand_total_price: sumGrand});

        let totalComm = sumGrand - sumCost;
        form.setFieldsValue({total_comm_price: totalComm.toFixed(2) || 0});

    }

    const handleCalculateProps = (index) => {
        const fields = form.getFieldsValue()
        const { stones } = fields;

        const data = form.getFieldValue('stones')[index];
        const length = parseFloat(data.length);
        const width = parseFloat(data.width);
        const depth = parseFloat(data.depth);

        let props = 0;

        if (width > 0 || depth > 0)
            props = length / (width >= depth ? width : depth);
        
        Object.assign(stones[index], { props: props.toFixed(2) || 0 })
        form.setFieldsValue({ stones })
    }


    return (
        <div>
            <Form 
                form={form} 
                {...formItemLayout} 
                layout="horizontal" 
                onFinish={handleFinish} 
                colon={true}
                autoComplete="off"
            >
                <fieldset>
                    <legend style={{fontSize:22, fontWeight:"bold"}}>
                        <FontAwesomeIcon icon={faAddressCard} style={{ marginRight: 10 }} />Information concerning the batch of gems
                    </legend>
                </fieldset>
                <Row gutter={10}>
                    <Col span={12} style={{borderRight:"1px solid #cacaca"}}>
                        <Form.Item label="Gem variety" name="gem_variety" initialValue="Tourmaline">
                            <Select options={gemOptions} />
                        </Form.Item>
                        <Form.Item label="Total weight" name="total_weight" initialValue={0}>
                            <Input type="number" placeholder="Total weight..." step=".01" suffix={<span style={{fontFamily:"Lato"}}>{currentUnit}</span>} onChange={value => handleConvertPrice(value, "total_weight")}/>
                        </Form.Item>
                        
                        <Form.Item label="Unit cost" name="price_per_unit" initialValue={0}>
                            <Input type="number" placeholder="Unit cost..." step=".01" min={0} suffix={<span style={{fontFamily:"Lato"}}>USD per {currentUnit}</span>} onChange={value => handleConvertPrice(value, "price_per_unit")} />
                        </Form.Item>
                        <Form.Item label="Total cost" name="total_price" initialValue={0}>
                            <Input type="number" placeholder="Total cost..." step=".01" min={0} suffix={<span style={{fontFamily:"Lato"}}>USD</span>} onChange={value => handleConvertPrice(value, 'total_price')} />
                        </Form.Item>
                        <Form.Item label="Grand total" name="grand_total_price" initialValue={0}>
                            <Input type="number" placeholder="Grand Total cost..." step=".01" min={0} readOnly suffix={<span style={{fontFamily:"Lato"}}>USD</span>} />
                        </Form.Item>
                    </Col>
                    <Col span={12} >
                        <Form.Item label="Seller name" name="seller_name">
                            <Input placeholder="Seller name..." />
                        </Form.Item>
                        {/* <Form.Item label="Telephone" name="seller_phone">
                            <Input type="tel" placeholder="Seller telephone number..." />
                        </Form.Item> */}
                        <Form.Item label="Notes" name="purchase_note">
                            <TextArea placeholder="Notes..." autoSize={{ minRows: 3, maxRows: 5 }} />
                        </Form.Item>
                        <Form.Item label="Weight unit" name="weight_unit" initialValue={currentUnit}>
                            <Select options={weightOptions} placeholder="< Weight Unit >" onSelect={value => setcurrentUnit(value)}/>
                        </Form.Item>
                        <Form.Item label="Length unit" name="length_unit" initialValue={currentLengthUnit}>
                            <Select options={lengthOptions} placeholder="< Length Unit >" onSelect={value => setcurrentLengthUnit(value)}/>
                        </Form.Item>
                        <Form.Item label="Total commission" name="total_comm_price" initialValue={0}>
                            <Input type="number" readOnly placeholder="Total commission cost..." step=".01" min={0} suffix={<span style={{fontFamily:"Lato"}}>USD ({commissionPercent}%)</span>} />
                        </Form.Item>
                    </Col>
                    
                    {/* <Divider ></Divider>
                    <Col span={24}>
                        <Form.Item label="Computed total weight" name="computed_total_weight" >
                            <Input type="number" placeholder="Computed total weight..." suffix={<span style={{fontFamily:"Monaco"}}>{currentUnit}</span>}/>
                        </Form.Item>
                        <Form.Item label="Computed total price" name="computed_total_price">
                            <Input type="number" placeholder="Computed total price..." suffix={<span style={{fontFamily:"Monaco"}}>USD</span>}/>
                        </Form.Item>
                    </Col> */}
                </Row>
                <fieldset style={{marginBottom:20 }}>
                    <legend style={{fontSize:22, fontWeight:"bold"}}>
                        <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: 10 }} />Information each individual gems
                    </legend>
                </fieldset>
                <Row gutter={[20, 20]} style={{marginBottom:20}}>
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
                            {fields.map(({ key, name, fieldKey, ...restField }, index) => {
                                
                                return (
                                    <Col span={12} key={key} style={{display:"flex", width:"100%", flexDirection:"column", marginBottom:10, borderLeft:"2px solid green"}}>
                                        <legend style={{width:"100%", display:"inline-flex", justifyContent:"space-between", alignItems:"center", borderTop:"1px solid #cacaca", paddingLeft:10, color:"green"}}>
                                            <span><FontAwesomeIcon icon={faGem} style={{ marginRight: 10, color:"green" }} />Gem Nº {" "}{index+1}</span>
                                            <span><FontAwesomeIcon icon={faTimesCircle} style={{color:"red"}} onClick={() => remove(name)} /></span>
                                        </legend>

                                        <Row>
                                            <Col span={12} style={{borderRight:"1px solid #cacaca"}}>
                                                <Form.Item
                                                    {...restField}
                                                    label="Weight"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'individual_weight']}
                                                    fieldKey={[fieldKey, 'individual_weight']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Individual weight" onChange={value => handleIndividualPrice(value, "individual_weight", name)} suffix={<span style={{fontFamily:"Lato"}}>{currentUnit}</span>}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Length"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'length']}
                                                    fieldKey={[fieldKey, 'length']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Length" suffix={<span style={{fontFamily:"Lato"}}>{currentLengthUnit}</span>} onChange={() => handleCalculateProps(name)}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Width"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'width']}
                                                    fieldKey={[fieldKey, 'width']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Width" suffix={<span style={{fontFamily:"Lato"}}>{currentLengthUnit}</span>} onChange={() => handleCalculateProps(name)}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Depth"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'depth']}
                                                    fieldKey={[fieldKey, 'depth']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Depth" suffix={<span style={{fontFamily:"Lato"}}>{currentLengthUnit}</span>} onChange={() => handleCalculateProps(name)}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Props"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'props']}
                                                    fieldKey={[fieldKey, 'props']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Proportions" suffix={<span style={{fontFamily:"Lato"}}>{currentLengthUnit}</span>} readOnly/>
                                                </Form.Item>
                                                
                                            </Col>
                                            <Col span={12}>
                                                
                                                <Form.Item
                                                    {...restField}
                                                    label="Unit cost"
                                                    initialValue={form.getFieldValue('price_per_unit')}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'unit_cost']}
                                                    fieldKey={[fieldKey, 'unit_cost']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Unit cost" onChange={value => handleIndividualPrice(value, "unit_cost", name)} suffix={<span style={{fontFamily:"Lato"}}>USD per {currentUnit}</span>}/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Tot cost"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'total_cost']}
                                                    fieldKey={[fieldKey, 'total_cost']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Total cost" onChange={value => handleIndividualPrice(value, 'total_cost', name)} suffix={<span style={{fontFamily:"Lato"}}>USD</span>} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Grand Tot"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'grand_total']}
                                                    fieldKey={[fieldKey, 'grand_total']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Grand total" suffix={<span style={{fontFamily:"Lato"}}>USD</span>} readOnly/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Comm"
                                                    initialValue={0}
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'commission']}
                                                    fieldKey={[fieldKey, 'commission']}
                                                >
                                                    <Input type="number" step=".01" placeholder="Commission price" suffix={<span style={{fontFamily:"Lato"}}>USD {"(" + commissionPercent +"%)"}</span>} readOnly/>
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    label="Details"
                                                    wrapperCol={{span : 16}}
                                                    name={[name, 'details']}
                                                    fieldKey={[fieldKey, 'details']}
                                                >
                                                    <TextArea placeholder="Details..." autoSize={{ minRows: 3, maxRows: 5 }} />
                                                </Form.Item>
                                            </Col>
                                            
                                        </Row>
                                        
                                    </Col>
                                )}
                            )}
                            <Col span={12} style={{display:"grid", placeContent:"center"}}>
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} style={{height:277, width:620}}>
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
