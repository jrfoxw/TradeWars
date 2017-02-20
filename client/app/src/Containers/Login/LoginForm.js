/**
 * Created by PY-DEV on 2/10/2017.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {Button, Icon, Form, Grid, Container, Input} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { logInUser } from '../../Actions/auth'
import classNames from 'classnames';
import './LoginForm.css';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
                        username: "",
                        password: "",
                        errors: [],

        };
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }



    handleOnChange(event){
        event.preventDefault();
        const target = event.target;
        this.setState({[target.name]: target.value})
    }

    handleOnSubmit(event) {
        event.preventDefault();
        console.log(`Logging In: ${this.state.username} with password: ${this.state.password}`);
        const sendUser = this.state;
        this.props.logInUser(sendUser).then((res) => {
            console.log(`Successfully logged in under username ${sendUser.username} :`);
            console.log('RESULTS: ', res);

            this.context.router.push('/players')

        }).catch((err) => {
            const tErrors = [...this.state.errors].concat(err.message);
            this.setState({errors: "Invalid credentials, check username and password and try again."})
        });
    }

    render(){
        const { title } = this.props.params;

        return (

            <Grid columns={1}>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <h1> { title } </h1>

                        <Form widths onSubmit={this.handleOnSubmit}>
                            <Form.Field>
                                <label>Username
                                </label>
                                <Input placeholder="Username"
                                       name="username"
                                       icon="user"
                                       iconPosition="left"
                                       value={this.state.username}
                                       onChange={this.handleOnChange}
                                />


                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input placeholder="Password"
                                       name="password"
                                       type="password"
                                        icon="privacy"
                                       iconPosition="left"
                                       value={this.state.password}
                                       onChange={this.handleOnChange}

                                />
                            </Form.Field>

                            <Button animated="left">
                                <Button.Content visible type='submit' >Login</Button.Content>
                                <Button.Content hidden type='submit'>
                                    <Icon name="arrow right"/>
                                </Button.Content>
                            </Button>


                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={8} >

                        <div className={!this.state.errors >0 ? "loginErrors" : "loginClean"}>
                            <strong>{this.state.errors}</strong> </div>
                            <Link to="/signup/SignUp">create account</Link>

                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

LoginForm.PropTypes = {
    title:React.PropTypes.string.isRequired,
    logInUser:React.PropTypes.func.isRequired

};

LoginForm.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return {
        user: state.Auth
    }
}

export default connect(mapStateToProps, { logInUser })(LoginForm);