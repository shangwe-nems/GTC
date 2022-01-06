import React, {useState} from 'react';
import { Row, Table, Card, Button, Modal, Form, Input } from 'antd';
import ProgressBar from 'react-customizable-progressbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faMapMarkerAlt, faInfoCircle, faSearchPlus, faTag, faVolumeUp, faShoppingBag, faTags, faPlus } from '@fortawesome/free-solid-svg-icons';
const moment = require('moment');

const columns = [
	{
		title: 'Date',
		dataIndex: 'date',
		key: 'date',
	},
	{
		title: 'Advance',
		dataIndex: 'advance',
		key: 'advance',
		render: (advance) => {
			return <span style={{ color: 'green' }}>{advance}</span>;
		},
	},
	{
		title: 'Balance',
		dataIndex: 'balance',
		key: 'balance',
		render: (balance) => {
			return <span style={{ color: 'red' }}>{balance}</span>;
		},
	},
	{
		title: 'Due',
		dataIndex: 'due',
		key: 'due',
		render: (due) => {
			return <span style={{ color: 'steelblue' }}>{due}</span>;
		},
	},
];

const dataList = [
    {
        key: "1",
        date: moment(new Date('2021-07-10')).format('MMMM Do YYYY'),
        advance: "$2100.00",
        balance: "$1400.00",
        due: "$3500.00"
    },
    {
        key: "2",
        date: moment(new Date('2021-07-12')).format('MMMM Do YYYY'),
        advance: "$1000.00",
        balance: "$400.00",
        due: "$1400.00"
    },
    {
        key: "3",
        date: moment(new Date('2021-07-18')).format('MMMM Do YYYY'),
        advance: "$400.00",
        balance: "$0.00",
        due: "$400.00"
    }
];




export default function Sales() {

    return (
        <div style={{display:"flex", flexDirection:"column", overflow:"hidden"}}>              
                <div style={{ display: "inline-flex", justifyContent: "center", alignItems: "center", width: "100%", height: "auto" }}>
                    <div style={{width:"50%", height:"fit-content", paddingTop:0}}>
                        <ProgressBar
                            radius={100}
                            progress={28.8}
                            cut={120}
                            rotate={-210}
                            initialAnimation
                            initialAnimationDelay={500}
                            strokeWidth={23}
                            strokeColor="rgba(76, 175, 80, .3)"
                            transition="1.5s ease 0.5s"
                            strokeLinecap="butt"
                            trackStrokeWidth={10}
                            trackStrokeColor="#F0F2F5"
                        >
                            <div className="indicator-volume" style={{position:'absolute', zIndex:3, marginTop:-150, width:'100%', textAlign:'center'}}>
                                <div className="inner" style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                                    <div className="icon" style={{ marginBottom:10}}>
                                        <FontAwesomeIcon icon={faTags} style={{fontSize:62}} color="#F0F2F5" />
                                    </div>
                                    <div className="percentage" style={{fontSize:33, fontFamily:'Menlo, Open Sans', fontWeight:'lighter', color:'#E6E6E6'}}>28.8%</div>
                                </div>
                            </div>
                        </ProgressBar>
                    </div>
                    <div style={{ width: '50%', fontSize: 21, paddingLeft: 2 }}>
                        <h1 style={{ fontSize: 30 }}>
                            Total cost: <br/> <b style={{ color: 'steelblue', border:'1px solid #ccc', padding:10, fontFamily:"Lato, sans-serif" }}>USD 4,500.00</b>
                        </h1>
                        <p style={{margin:0, padding: 0}}>
                            Paid: <b style={{ color: 'green', fontFamily:"Lato, sans-serif", marginLeft:15 }}>USD 1,300.00</b>
                        </p>
                        <p style={{margin:0, padding: 0}}>
                            Balance: <b style={{ color: 'red', fontFamily:"Lato, sans-serif", marginLeft:15 }}>USD 3,200.00</b>
                        </p>
                    </div>
                </div>
                <div>
                    <Card size="small" type="primary" size="default" bordered={false}>
                        <Table
                            pagination={false}
                            size="small"
                            bordered={false}
                            columns={columns}
                            dataSource={dataList}
                        />
                    </Card>
                </div>
			</div>
    )
}
