/**
 * Created by PY-DEV on 2/10/2017.
 */
import React, { Component } from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';


class Navbar extends Component{
        constructor(props){
            super(props);
            this.state = {}
        }

    handleItemClick = (e, { name }) => this.setState({
        activeItem: name
    });

        render(){
            const { activeItem } = this.state;
            return(

                <div>
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
                </div>
            )
        }

}

export default Navbar;


