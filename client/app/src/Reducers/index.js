import { combineReducers } from 'redux'
import Auth from './users'
import Players from './players'
import FlashMessage from './flashReducer'

export default combineReducers({
    Auth,
    Players,
    FlashMessage,

})

