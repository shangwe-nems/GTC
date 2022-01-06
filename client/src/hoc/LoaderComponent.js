import React from 'react';
import customLoader1 from '../components/assets/img/loader1.gif';
import customLoader2 from '../components/assets/img/loader2.gif';

export function LoaderComponentList(){
    return <div style={{ width: '100%', height: 900, display: 'grid', placeContent: 'center', backgroundColor: '#FFFEFE', border:"1px solid #cacaca" }}>
        <div>
            <img src={customLoader2} alt="spinner" style={{ width: 200, height: 'auto' }} />
            <p style={{ fontSize: 18, marginTop: 5, color: '#cacaca' }}>Loading...</p>
        </div>
    </div>
}

export function LoaderComponentContainer(){
    return <div style={{ width: '100%', height: 1008, display: 'grid', placeContent: 'center', backgroundColor: '#FFFEFE', border:"1px solid #cacaca" }}>
        <div>
            <img src={customLoader1} alt="spinner" style={{ width: 400, height: 'auto' }} />
            <p style={{ fontSize: 18, marginTop: 5, color: '#cacaca' }}>Loading...</p>
        </div>
    </div>
}