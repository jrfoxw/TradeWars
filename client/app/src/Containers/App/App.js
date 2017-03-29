import React, { Component } from 'react';
import './App.css';

// Semantic-ui
import { Button, Icon, Menu, Grid } from 'semantic-ui-react'

// Containers
import Navbar from '../Navbar'
import Login from '../Login'
import SignUp from '../Signup'

// Common
import DiceRoller from '../../Common/diceRoller';
import sText from '../../Common/showText';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

  render() {
      const { activeItem } = this.state;
      const loggedIn = false;
    return (
      <Grid columns={1}>

            <Navbar/>
          {this.props.children}
          {loggedIn }


      </Grid>
    );
  }
}

export default App;
