import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    GET_ALL_USERS,
} from '../_actions/types';
 

export default function(state={},action){
    switch(action.type){
        case REGISTER_USER:
            return { ...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSucces: action.payload }
        case AUTH_USER:
            return { ...state, userData: action.payload }
        case GET_ALL_USERS:
            return { ...state, ALL_USERS: action.payload.result }
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }
}