import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Icon, Menu } from 'semantic-ui-react'
import Navbar from './Containers/Navbar/Navbar'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }



  render() {
      const { activeItem } = this.state;
    return (
      <div className="App">
            <Navbar/>


          <h1>Welcome</h1>

        <Button animated="fade">

        <Button.Content visible>
          <Icon name="search"/>
        </Button.Content>
        <Button.Content hidden >
          <Icon name="heart"/>
        </Button.Content>

        </Button>
      </div>
    );
  }
}

export default App;
