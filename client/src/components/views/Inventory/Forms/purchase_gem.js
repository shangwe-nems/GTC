import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Button, Row, message, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const formItemLayout = {
    labelCol: {span: 8 },
    wrapperCol: {span: 14},
};

export default function PurchaseGem({purchaseData}) {
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
                                <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: 10 }} />Information concerning the acquisition of the gem
                            </legend>
                        </fieldset>
                        Here goes the seller info
                    </Col>
                    <Col span={24}>
                        <fieldset>
                            <legend>
                                <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: 10 }} />Informations concerning the buying price of the gem
                            </legend>
                        </fieldset>
                        here goes the pricing of the gem
                    </Col>
                </Row>
            </Form>
        </div>
    )
}
