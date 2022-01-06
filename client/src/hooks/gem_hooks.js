import { useState, useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGems } from '../_actions/inventory_actions';

const createHistory  = require('history').createHashHistory;

export const LoadAllGems = () => {
    const dispatch = useDispatch();
    const history = createHistory();
    const [isLoading, setisLoading] = useState(false);
    const [gems, setgems] = useState([]);

    useEffect(() => {
        setisLoading(true);
        dispatch(getAllGems())
			.then(response => {
				if (response.payload) {
					// console.log("Current gems: ", response.payload.data);
					setgems(response.payload.data);
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

    return [isLoading, gems];
}


