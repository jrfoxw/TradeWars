import localhost from '../config'
import SET_USER_ACTION from '../Actions/types'
import axios from 'axios';
import jwt from 'jwt-decode';
import setAuthorizationToken from '../utils/setAuthorizationToken'

export function setUser(user){
    return {
        type: SET_USER_ACTION,
        user
    }
}




// export function fetchUsers() {
//     return dispatch => {
//         axios.get(`http://192.168.1.130:3001/api/users/`)
//             .then((res) => {
//                 console.log('Getting Auth ',res.data);
//
//                 })
//             .then((data) => dispatch(setUsers(data)))
//             .catch((err) => console.log('Error in getting users',err))
//
//     }
// }









