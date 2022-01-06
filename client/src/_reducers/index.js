import { combineReducers } from 'redux';
import user from './user_reducer';
import inventory from './inventory_reducer';

const rootReducer = combineReducers({
    user, inventory
});

export default rootReducer;