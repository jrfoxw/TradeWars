/**
 * Created by jrfoxw on 2/18/17.
 */
import React, { Component } from 'react'
import { Button, Icon, Menu, Container, Grid} from 'semantic-ui-react';
import { Link } from 'react-router';


class NoAuthLinks extends Component {
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

            <Menu fluid widths={4}>
                <Menu.Item
                    name="logo"
                    active={activeItem === 'logo'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/home">LOGO</Link>
                </Menu.Item>

                <Menu.Item
                    name="about"
                    active={activeItem === 'about'}
                    onClick={this.handleItemClick}
                >
                    <Link to="#">About</Link>
                </Menu.Item>

                <Menu.Item
                    name="login"
                    active={activeItem === 'login'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/login">Login</Link>
                </Menu.Item>

            </Menu>
        )
    }



}

export default NoAuthLinks;