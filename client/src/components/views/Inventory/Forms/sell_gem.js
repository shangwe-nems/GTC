import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, message, Col, Upload, Modal } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileVideo, faImages, faPaperclip, faTags, faUserTag, faVideo } from '@fortawesome/free-solid-svg-icons';

const formItemLayout = {
    labelCol: {span: 8 },
    wrapperCol: {span: 14},
};

export default function SellGem( {saleData} ) {
    const [form] = Form.useForm();

    const handleSubmit = (data) => {

    }

    return (
        <div>
           <Form form={form} {...formItemLayout} layout="horizontal" onFinish={handleSubmit} colon={true}>
                <Row gutter={10}>
                    <Col span={24}>
                        <fieldset>
                            <legend>
                                <FontAwesomeIcon icon={faTags} style={{ marginRight: 10 }} />Information concerning the sale of the gem
                            </legend>
                        </fieldset>
                        Here goes the sale form
                        {/* <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item> */}
                    </Col>
                    <Col span={24}>
                        <fieldset>
                            <legend>
                                <FontAwesomeIcon icon={faUserTag} style={{ marginRight: 10 }} />Informations concerning the sale price of the gem
                            </legend>
                        </fieldset>
                        {/* <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input type="text" />
                        </Form.Item> */}
                        Here goes the pricing data
                    </Col>
                    <Col span={24}>
                    </Col>
                </Row>
            </Form> 
        </div>
    )
}
