import React from 'react';
import { Result, Button } from 'antd';
import Footer from '../Footer/Footer';
import createHistory from 'history/createHashHistory'


export default function ErrorPage(props) {
    const history = createHistory();
    const { match } = props;
    const code = match.params.code;

    return (
        <>  
            <div className="app">
                {!code || code === '404' ?
                <Result
                    status="404"
                    title="404"
                    subTitle="Désolé, page non existante!"
                    extra={<Button type="primary" onClick={() => (history.push("/"))}>Retourner à l'acceuil</Button>}
                /> : 
                <Result
                    status="403"
                    title="403"
                    subTitle = "Désolé, vous n’êtes pas autorisé à accéder à cette page."
                    extra={<Button type="primary" onClick={() => (history.push("/"))} >Retourner à l'acceuil</Button>}
                />}
            </div>
            <Footer />
        </>
    )
}
