import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { importSettings } from '../_actions/inventory_actions';

export const LoadAllSettings = () => {
    const dispatch = useDispatch();
    const stateCurrentSettings = useSelector(state => state.inventory.SETTINGS);
    const [isLoading, setisLoading] = useState(false);
    const [settings, setSettings] = useState({});

    useEffect(() => {
        setisLoading(true);
        dispatch(importSettings())
			.then(response => {
				if (response.payload) {
					// console.log("Current settings: ", response.payload);
					setSettings(response.payload);
                    setisLoading(false);
				}
			})
			.catch(err => {
				setisLoading(false);
				console.error(err);
			});
        
    }, []);

    return [isLoading, settings];
}


