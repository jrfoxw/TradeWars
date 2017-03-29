/**
 * Created by jrfoxw on 2/25/17.
 */
import { ADD_FLASH_MESSAGE_ACTION, GET_FLASH_MESSAGE_ACTION, DEL_FLASH_MESSAGE_ACTION} from '../Actions/flashActions'
import shortU from 'short-uuid';

const initialState = {
    id: shortU.uuid(),
    color: "white",
    message: "Press Any Button to Begin...",
    history: []
};


export default function flashMessages (state=initialState, action={}){
    switch(action.type){
        case ADD_FLASH_MESSAGE_ACTION:
            return {
                id: shortU.uuid(),
                color: "",
                message: action.message,
                history: history.push(action.message)
            };
        case DEL_FLASH_MESSAGE_ACTION:
            return action.message;
        case GET_FLASH_MESSAGE_ACTION:
            return action.message;
        default:
            return state;


    }

}