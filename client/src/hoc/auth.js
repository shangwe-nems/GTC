/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";
import { notification } from 'antd';

export default function (SpecificComponent, option, adminRoute = null) {
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            //To know my current status, send Auth request 
            dispatch(auth()).then(response => {
                //Not Loggined in Status 
                if (!response.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    notification['success']({
                        message: 'Welcome back!!',
                        description: 'Server connected successfully...',
                        placement: 'bottomRight'
                    });

                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/main/')
                        }
                    }
                }
            })
            .catch(err => {
                console.error('====================================');
                console.error(err.response.data.message);
                console.error('====================================');

                if(err.response.data.message === 'token expired') {
                    props.history.push('/login');
                    setTimeout(() => {
                        notification['error']({
                            message: 'Invalid session',
                            description: 'Your session has expired!!',
                            placement: 'bottomRight'
                        });
                    }, 1500);
                }

                if(err.response.data.message === 'JWT must be provided') {
                    props.history.push('/login');
                    setTimeout(() => {
                        notification['error']({
                            message: 'Invalid token',
                            description: 'JWT must be provided!!',
                            placement: 'bottomRight'
                        });
                    }, 1500);
                }
                
            })

        }, [])

        return (
            <SpecificComponent {...props} user={user} />
        )
    }
    return AuthenticationCheck
}


