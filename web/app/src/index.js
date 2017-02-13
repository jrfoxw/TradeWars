import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './Containers/App/App';
import Login from './Containers/Login';
import SignUp from './Containers/Signup';
import Roller from './Common/diceRoller';
import Quest from './Containers/Quest';

import store from './store'
import './index.css';


const app = document.getElementById('root');

ReactDOM.render(
 <Provider store={store}>
     <Router history={browserHistory}>
         <Route path="/" component={App}>
            <Route path="/login" component={Login}/>
            <Route path="/login/:title" component={Login}/>
            <Route path="/signup/:title" component={SignUp}/>

         <Route path="/roller" component={Roller}/>
         <Route path="/quest" component={Quest}/>
         </Route>
     </Router>
 </Provider>,
    app

);
