import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../_actions/user_actions';

const createHistory  = require('history').createHashHistory;

export const LoadAllUsers = () => {
    const dispatch = useDispatch();
    const history = createHistory();
    const [isLoading, setisLoading] = useState(false);
    const [users, setusers] = useState([]);

    useEffect(() => {
        setisLoading(true);
        dispatch(getUsers())
			.then(response => {
				if (response.payload) {
					console.log("Current users: ", response.payload.data);
					setusers(response.payload.data);
                    setisLoading(false);
				}
			})
			.catch(err => {
				setisLoading(false);
				console.error(err);
                if(err.response.data.message === 'token expired') {
                    history.push('/login');
                    setTimeout(() => {
                        notification['error']({
                            message: 'Invalid session',
                            description: 'Your session has expired!!',
                            placement: 'bottomRight'
                        });
                    }, 1500);
                }
			});
        
    }, []);

    return [isLoading, users];
}


