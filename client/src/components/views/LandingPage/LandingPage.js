import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import React from 'react'
import Footer from '../Footer/Footer';

function LandingPage(props) {
    return (
        <>
            <div className="app">

                <div style={{backgroundImage: "linear-gradient(#fafafa, #D7EDD8)", padding: "20px 30px", borderRadius: 20, boxShadow: "0 24px 18px -6px #7B7A7F", display:"flex", flexDirection:"column", alignItems:"center", marginBottom:35 }}>
                    <img src={require('../../assets/img/logo.png')} height={150} width="auto" style={{background:"transparent", border:"none"}}/>
                    <p style={{ fontSize: '1.5rem', color : "#4CAF50", fontWeight:"800", fontFamily:'Bahnschrift', margin:0, letterSpacing:2, marginTop: 2}}>Binja Flora</p>
                </div>
                
                
                <span style={{ fontSize: '2.5rem', margin:0 }}>Gem Traders Companion</span><br/>
                <Button shape="round" size="large" type="primary" onClick={() => props.history.push("/login")}>Get Started</Button>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(LandingPage);