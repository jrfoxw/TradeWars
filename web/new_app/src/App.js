import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, Icon, Menu } from 'semantic-ui-react'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    handleItemClick = (e, { name }) => this.setState({
        activeItem: name
    });

  render() {
      const { activeItem } = this.state;
    return (
      <div className="App">

        <Menu>
            <Menu.Item
                name="logo"
                active={activeItem === 'logo'}
                onClick={this.handleItemClick}
                >
                LOGO
            </Menu.Item>
            <Menu.Item
                name="players"
                active={activeItem === 'players'}
                onClick={this.handleItemClick}
                >
                Players
            </Menu.Item>
            <Menu.Item
                name="Quests"
                active={activeItem === 'quest'}
                onClick={this.handleItemClick}
            >
                Quest
            </Menu.Item>
        </Menu>

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
