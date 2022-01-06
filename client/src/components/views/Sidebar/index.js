import React, { useState, useEffect } from 'react';
import { Badge } from 'antd';
import { withRouter } from 'react-router-dom';
//import createHistory from require("history").createHashHistory;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faRss, faChartLine, faHistory, faCube, faFolder, faImage, faUsers, faUserCog, faComments } from '@fortawesome/free-solid-svg-icons'
import "./sidebar.css";

const createHistory  = require('history').createHashHistory;

function Sidebar() {
    const history = createHistory();
    const [activeTab, setactiveTab] = useState(null);

    useEffect(() => {
        let current = localStorage.getItem('current');
        setactiveTab(current);
        history.push('/'.concat(current));
    })

    const onMenuClick = (key) => {
        setactiveTab(key)
        history.push('/'.concat(key));
        localStorage.setItem('current', key);
    }

    return (
        <div className="sidebarContainer">
            <div style={{display:'inline-flex', justifyContent:'space-between'}}>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize:12, padding:'17px 20px', alignItems:'center'}} className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => onMenuClick('dashboard')}>
                    <FontAwesomeIcon icon={faHome} style={{fontSize:34, marginBottom:3}} />Dashboard
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize: 12, padding:'17px 20px', alignItems: 'center' }} className={activeTab === 'inventory' ? 'active' : ''} onClick={() => onMenuClick('inventory')}>
                    <FontAwesomeIcon icon={faFolder} style={{fontSize:34, marginBottom:3}} />Inventory
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize:12, padding:'17px 20px', alignItems:'center'}} className={activeTab === 'administration' ? 'active' : ''} onClick={() => onMenuClick('administration')}>
                    <FontAwesomeIcon icon={faCube} style={{fontSize:34, marginBottom:3}} />Administration
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize:12, padding:'17px 20px', alignItems:'center'}} className={activeTab === 'gallery' ? 'active' : ''} onClick={() => onMenuClick('gallery')}>
                    <FontAwesomeIcon icon={faImage} style={{fontSize:34, marginBottom:3}} />Gallery
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize:12, padding:'17px 20px', alignItems:'center'}} className={activeTab === 'chats' ? 'active' : ''} onClick={() => onMenuClick('chats')}>
                    <FontAwesomeIcon icon={faComments} style={{fontSize:34, marginBottom:3}} />Chats
                </span>
                <span style={{ display: 'flex', flexDirection: 'column', width: '100px', fontSize:12, padding:'17px 20px', alignItems:'center'}} className={activeTab === 'agents' ? 'active' : ''} onClick={() => onMenuClick('agents')}>
                    <FontAwesomeIcon icon={faUserCog} style={{fontSize:34, marginBottom:3}} />Agents
                </span>
            </div>
            
        </div>
    )
}

export default Sidebar;

