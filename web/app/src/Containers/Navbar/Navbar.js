/**
 * Created by PY-DEV on 2/10/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Container, Grid} from 'semantic-ui-react';


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

                <Grid.Row>
                    <Grid.Column>
                        <Container>
                    <Menu fluid widths={4}>
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
                            <Link to="/players">Players</Link>
                        </Menu.Item>
                        <Menu.Item
                            name="Quests"
                            active={activeItem === 'quest'}
                            onClick={this.handleItemClick}
                        >
                            <Link to="/quest">Quest</Link>
                        </Menu.Item>
                        <Menu.Item
                            name="Login"
                            active={activeItem === 'login'}
                            onClick={this.handleItemClick}
                        >
                            <Link to="/login/Login">Login</Link>
                        </Menu.Item>
                    </Menu>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            )
        }

}

export default Navbar;


