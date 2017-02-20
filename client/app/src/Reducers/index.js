import { combineReducers } from 'redux'
import Auth from './users'
import Players from './players'

export default combineReducers({
    Auth,
    Players
})

