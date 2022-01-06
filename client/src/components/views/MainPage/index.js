import React from 'react';
import { Layout, Affix } from "antd";
// import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { HashRouter as Router} from 'react-router-dom'
import './mainpage.module.css';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { MainRoutes } from '../../App';

export default function MainPage() {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
             <div style={{ width: '100%', position: 'fixed', top: '0', zIndex: '100' }}>
                <Header />
            </div>
            <Layout style={{height:'100%', width:'100%'}}>
                <Layout.Content style={{ padding: '110px 10px 20px 10px', backgroundColor:'#D7EDD8' }}>
                    <Router>
                        <MainRoutes />
                    </Router>
                    <Footer />
                </Layout.Content>
            </Layout>
        </div>
        
    )
}
