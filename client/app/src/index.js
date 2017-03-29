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
import Players from './Containers/Players';
import Home from './Containers/Homepage';
import Create from './Containers/Create';
import QCreator from './Components/QuestCreator';
import QSelect from './Components/QuestCreator';
import DungeonMap from './Components/DungeonMap';
import SocketTest from './Components/SocketTest';
import Audio from './Components/Audio';


import store from './store';
import './index.css';


const app = document.getElementById('root');




ReactDOM.render(
 <Provider store={store}>
   <Router history={browserHistory}>
     <Route path="/" component={App}>
       <Route path="/home" component={Home} />
       <Route path="/login" component={Login}/>
       <Route path="/login/:title" component={Login}/>
       <Route path="/signup" component={SignUp}/>
       <Route path="/signup/:title" component={SignUp}/>

       <Route path="/roller" component={Roller}/>

       <Route path="/quest" component={Quest}/>
       <Route path="/qselect" component={QSelect}/>
       <Route path="/qcreator" component={QCreator}/>

       <Route path="/players" component={Players}/>
       <Route path="/create" component={Create}/>

       <Route path="/dungeon" component={DungeonMap}/>
       <Route path="/socket" component={SocketTest}/>
       <Route path="/audio" component={Audio}/>


     </Route>
         </Router>
         </Provider>,
    app

);
