import localhost from '../config'
import { GET_ALL_PLAYERS_ACTION, CREATE_PLAYER_ACTION } from './types'
import axios from 'axios';

export function getPlayers(players){
    return {
        type: GET_ALL_PLAYERS_ACTION,
        players
    }
}




export function fetchPlayers(user) {
    return dispatch => {
        axios.post(`http://192.168.1.130:3001/api/users/players`,user)
            .then((res) => dispatch(getPlayers(res.data)))
            .catch((err) => console.log('Error in getting players',err))

    }
}

export function createPlayer(player, user){
    player.user_id = user.user.id;
    player.player_hp = 25;
    player.player_mp = 15;
    player.player_att = 8;
    player.player_def = 10;
    player.player_inv = ['knife','shirt','pants'];
    console.log('PLAYER CREATED:: ',player,user);
    return axios.post('http://192.168.1.130:3001/api/users/create', player)
            .then((res) =>{ console.log("RES ",res)})
            .catch((err) =>{ console.log("ERR ",err)})

}


