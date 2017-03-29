import { SET_CURRENT_USER,
         SET_USERS_ACTION,
         GET_USER_ACTION,
         SET_USER_ACTION } from '../Actions/types';
import _ from 'lodash';

const initialState = {
    isAuthenticated: false,
    user: {}
};


export default function users(state = initialState, action= {}) {
    switch(action.type){
        case SET_USERS_ACTION:
            return action.user;
        case SET_CURRENT_USER:
            return {
                isAuthenticated: !_.isEmpty(action.user),
                user: action.user
            };
        case GET_USER_ACTION:
            return action.user;
        case SET_USER_ACTION:
            return action.user;
        default:
            return state;

    }
}

