import React from 'react'
// import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            display: 'flex', width:'100%',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'12px', padding: '10px 0px 10px 0px'
        }}>
           <p> Copyright &#169; {new Date().getFullYear()} Binja Flora SARL. Tout droits reservés.</p>
        </div>
    )
}

export default Footer
