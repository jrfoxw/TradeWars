/**
 * Created by jrfoxw on 2/18/17.
 */
import React from 'react'
import { Button, Icon, Menu, Container, Grid, Dropdown, Image, List} from 'semantic-ui-react';
import  Logo from './20sided.jpg'
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logOutUser } from '../../Actions/auth'




class AuthLinks extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    handleItemClick = (e, { name }) => this.setState({
        activeItem: name
    });

    logOut = () => {
        this.props.logOutUser();
        console.log("Logging out...");
        this.context.router.push('/login')

    };

    render(){

        const { activeItem } = this.state;
        const userInfo = this.props.user.user;
        return(

            <Menu fluid widths={4}>
                <Menu.Item
                    name="logo"
                    active={activeItem === 'logo'}
                    onClick={this.handleItemClick}
                >
                    <Link to="/home"><Image src={Logo} size="tiny" shape="circular"/></Link>
                </Menu.Item>
                <Menu.Item>

                    <Dropdown text='Quest' pointing='down' className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="/quest">Show Quests</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/qcreator">Quest Creator</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/qcreator">Quest Selector</Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/*name="quests"*/}
                    {/*active={activeItem === 'quest'}*/}
                    {/*onClick={this.handleItemClick}*/}
                {/*>*/}
                    {/*<Link to="/quest">Quest</Link>*/}
                </Menu.Item>
                <Menu.Item>
                    <Dropdown text='Player' pointing='down' className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Link to="/create">Add Player</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link to="/players">View Players</Link>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item
                    name="Logout"
                    active={activeItem === 'logout'}
                    onClick={this.logOut.bind(this)}
                >
                    <Container>
                    <Image src={userInfo.avatar}
                           size="mini"
                           shape="circular"
                           avatar/>

                        <List>
                            <List.Header>{userInfo.username}</List.Header>
                            <List.Header><Link to="#">Logout</Link></List.Header>
                        </List>
                    </Container>
                </Menu.Item>
            </Menu>
        )
    }


}

AuthLinks.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

AuthLinks.propTypes = {
    user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.Auth
    }
}


export default connect(mapStateToProps,{logOutUser})(AuthLinks);