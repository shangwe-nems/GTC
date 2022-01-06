import { ADD_NEW_GEM, ALL_BATCHES, ALL_GEMS, CURRENT_SELECTED_GEM, SETTINGS, UPDATE_GEM, SET_CURRENT_BATCH } from '../_actions/types';

export default function(state={}, action) {
    switch (action.type) {
        case ALL_GEMS: 
            return {...state, ALL_GEMS: action.payload.data};
        case ALL_BATCHES: 
            return {...state, ALL_GEMS: action.payload.data};
        case ADD_NEW_GEM:
            return {...state, ALL_GEMS: [action.payload.data, ...state.ALL_GEMS]};
        case SET_CURRENT_BATCH : 
            return {...state, CURRENT_GROUP: action.payload};
        case CURRENT_SELECTED_GEM:
            return {...state, CURRENT_SELECTED_GEM: action.payload.data, CURRENT_GROUP: action.payload.group};
        case UPDATE_GEM: 
            let allBatches  = state.ALL_GEMS;
            let objIndex = allBatches.findIndex((obj => obj._id === state.CURRENT_GROUP));

            let allGems = allBatches[objIndex].gems;
            let objIndexGem = allGems.findIndex(obj => obj._id === action.payload.result._id);

            allGems[objIndexGem] = action.payload.result;
            allBatches[objIndex].gems = allGems;
            
            return { ...state,
                ALL_GEMS : allBatches,
                CURRENT_SELECTED_GEM: action.payload.result
            }
        
        case SETTINGS: 
            return {...state, SETTINGS: action.payload.data}
        
        default:
            return state;
    }
}