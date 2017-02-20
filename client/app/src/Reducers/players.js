import { GET_ALL_PLAYERS_ACTION } from '../Actions/types';

export default function players(state = [], action= {}) {
    switch(action.type){
        case GET_ALL_PLAYERS_ACTION:
            console.log('ACTION Total Players: ',action.players.length);
            return action.players;
        default:
            return state;

    }
}
