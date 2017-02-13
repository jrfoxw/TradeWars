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
      <div className="App">

            <Navbar/>
          {this.props.children}
          {loggedIn }



          <Grid.Row>
              <Grid.Column width="8"
                           style={{ padding:"5px",
                                    }}>

                   <DiceRoller/>

              </Grid.Column>
          </Grid.Row>

      </div>
    );
  }
}

export default App;
