/**
 * Created by jrfoxw on 2/11/17.
 */
import React, {Component} from 'react';
import {Button, Icon, Form, Grid} from 'semantic-ui-react';
import axios from 'axios';


class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};


        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }

    handleOnChange(event) {

        event.preventDefault();
        const target = event.target;
        this.setState({[target.name]: target.value});


    }

    handleOnSubmit(event) {
        event.preventDefault();
        console.log('Final State, ',this.state);
        axios.post('http://192.168.1.130:3001/api/signup',{user:this.state})
            .then((res) =>{
                console.log("User Posted: ",res)
            })
            .catch((err) =>{
                console.log("Error: ",err)
            })


    }

    render() {
        const { title } = this.props.params;
        return (

                <Grid columns={1}>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <h1> { title } </h1>
                        <Form widths onSubmit={this.handleOnSubmit}>
                            <Form.Field>
                                <label>Usename</label>
                                <input type="text"
                                       name="username"
                                       placeholder="Usename"
                                       value={this.state.username}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Avatar</label>
                                <input type="text"
                                       name="avatar"
                                       placeholder="Avatar"
                                       value={this.state.avatar}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input type="password"
                                       name="password"
                                       placeholder="Password"
                                       value={this.state.password}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Confirm Password</label>
                                <input type="password"
                                       name="confirm"
                                       placeholder="Retype Password"
                                       value={this.state.confirm}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>

                            <Button animated="left">
                                <Button.Content visible type='submit'>SignUp</Button.Content>
                                <Button.Content hidden type='submit'>
                                    <Icon name="arrow right"/>
                                </Button.Content>
                            </Button>

                        </Form>
                    </Grid.Column>
                </Grid.Row>
                    </Grid>


        )
    }
}

SignUpForm.propTypes = {

};

export default SignUpForm;