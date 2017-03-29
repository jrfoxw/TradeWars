/**
 * Created by jrfoxw on 2/25/17.
 */
import {ADD_FLASH_MESSAGE_ACTION, DEL_FLASH_MESSAGE_ACTION, GET_FLASH_MESSAGE_ACTION } from './types.js';
import axios from 'axios';



export function addMessage(flashMessage){
    // console.log('Attempting to add message.. ',flashMessage);
    return {
        type: ADD_FLASH_MESSAGE_ACTION,
        flashMessage
    }
}

export function delMessage(flashMessage){
    return{
        type: DEL_FLASH_MESSAGE_ACTION,
        flashMessage
    }

}

export function getMessage(flashMessage){
    return{
        type: GET_FLASH_MESSAGE_ACTION,
        flashMessage
    }
}


