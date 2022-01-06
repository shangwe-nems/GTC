import React from 'react'
import { Col, Descriptions, Divider, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

export default function WMT({data}) {

    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider orientation="left">
                        <FontAwesomeIcon icon={faInfoCircle} /> Batch Info
                    </Divider>
                    <Descriptions size="small" layout="vertical" style={{marginTop:10}}>
                        <Descriptions.Item label="Batch Tot. Weight">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b> <span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.weight_unit}</span>{numberWithCommas(data.group.total_weight)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Batch pieces">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b>{numberWithCommas(data.group.pieces)}<span style={{fontSize:18, fontWeight:"lighter", marginLeft:5}}>pcs</span></b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Gem Variety">
                            <p style={{ fontSize: 18, marginTop: -5 }}>
                                <b>{data.description.nom} </b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Details">
                            <p style={{ fontSize: 16, marginTop: 5, color:"#a6a6a6" }}>
                                {data.description.details}
                            </p>
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">
                        <FontAwesomeIcon icon={faInfoCircle} /> Gem Measurements
                    </Divider>
                    <Descriptions size="small" layout="vertical" style={{marginTop:10}}>
                        
                        <Descriptions.Item label="Individual Weight">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b><span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.weight_unit}</span>{numberWithCommas(data.measurements.individual_weight)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Length">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b><span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.length_unit}</span>{numberWithCommas(data.measurements.length)} </b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Width">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b> <span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.length_unit}</span>{numberWithCommas(data.measurements.width)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Depth">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b> <span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.length_unit}</span>{numberWithCommas(data.measurements.depth)}</b>
                            </p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Proportions">
                            <p style={{ fontSize: 28, marginTop: -5 }}>
                                <b><span style={{fontSize:18, fontWeight:"lighter", marginRight:5}}>{data.measurements.length_unit}</span>{numberWithCommas(data.measurements.props)} </b>
                            </p>
                        </Descriptions.Item>
                        
                    </Descriptions>
                    
                </Col>
            </Row>
        </div>
    )
}
