import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Root from './Reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import jwt from 'jwt-decode';
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './Actions/auth'

const store = createStore(
    Root,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

if(localStorage.jwtToken) {
    setAuthorizationToken(localStorage.jwtToken);
    store.dispatch(setCurrentUser(jwt(localStorage.jwtToken)))
}

export default store

