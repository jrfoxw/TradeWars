/**
 * Created by PY-DEV on 2/10/2017.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { Button, Icon, Menu, Container, Grid} from 'semantic-ui-react';
import { connect } from 'react-redux';

import AuthLinks from './AuthLinks'
import NoAuthLinks from './NoAuthLinks'


class Navbar extends Component{
        constructor(props){
            super(props);
            this.state = {}
        }

    handleItemClick = (e, { name }) => this.setState({
        activeItem: name
    });


        render(){
            console.log("Current User: ",this.props.user);
            const { activeItem } = this.state;
            const { isAuthenticated } = this.props.user;





            return(

                <Grid.Row>
                    <Grid.Column>
                        <Container>

                                {!isAuthenticated ? <NoAuthLinks/> : <AuthLinks/>}


                        </Container>
                    </Grid.Column>
                </Grid.Row>
            )
        }

}

Navbar.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

Navbar.propTypes = {
    user: React.PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.Auth
    };
}


export default connect(mapStateToProps)(Navbar);


