/**
 * Created by PY-DEV on 2/10/2017.
 */
import React, {Component} from 'react';
import { Link } from 'react-router';
import {Button, Icon, Form, Grid, Container, Input} from 'semantic-ui-react';


class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        const { title } = this.props.params;
        return (

            <Grid >
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <h1> { title } </h1>
                        <h2> To access account </h2>
                        <Form widths>
                            <Form.Field>
                                <label>Username
                                </label>
                                <Input placeholder="Username"
                                       icon="user"
                                       iconPosition="left"
                                />


                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input placeholder="Password"
                                        icon="privacy"
                                       iconPosition="left"

                                />
                            </Form.Field>

                            <Button animated="left">
                                <Button.Content visible type='submit'>Login</Button.Content>
                                <Button.Content hidden type='submit'>
                                    <Icon name="arrow right"/>
                                </Button.Content>
                            </Button>

                        </Form>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row centered >
                    <Grid.Column width={8} offset={2}>
                        <Container>
                            <Link to="/signup/SignUp">create account</Link>
                        </Container>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

        )
    }
}

LoginForm.PropTypes = {
    title:React.PropTypes.string.isRequired

};

export default LoginForm;