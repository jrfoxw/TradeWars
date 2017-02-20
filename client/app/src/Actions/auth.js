import localhost from '../config'
import { ADD_USER_ACTION, SET_CURRENT_USER } from '../Actions/types'
import axios from 'axios';
import jwt from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken'

export function addUser(user){
    return {
        type: ADD_USER_ACTION,
        user
    }
}


export function setCurrentUser(user){
    return {
        type: SET_CURRENT_USER,
        user
    }
}


export function signUpUser(user) {
    console.log('Trying to sign user.. ',user);
      return axios.post("http://192.168.1.130:3001/api/signup",{user:user})
          .then((res) => { console.log("SUCCESS!! ",res) })
          .catch((err) => {console.log("There was an error.. ",err)})



}

export function logInUser(user){
    return dispatch => {
        return axios.post('http://192.168.1.130:3001/api/auth/', user).then(res =>{
            const jwtToken = res.data.token;
            localStorage.setItem('jwtToken',jwtToken);
            setAuthorizationToken(jwtToken);
            dispatch(setCurrentUser(jwt(jwtToken)));
        })

    }
}

export function logOutUser(){
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setAuthorizationToken(false);
        dispatch(setCurrentUser());
    }
}


// axios.post('http://192.168.1.130:3001/api/signup',{user:this.state})



// List Auth (Admin only)

// Update User

// Delete User (Admin only)