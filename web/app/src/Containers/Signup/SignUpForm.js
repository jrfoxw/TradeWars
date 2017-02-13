/**
 * Created by jrfoxw on 2/11/17.
 */
import React, {Component} from 'react';
import {Button, Icon, Form, Grid} from 'semantic-ui-react'


class SignUpForm extends Component {
    constructor(props) {
        super(props);
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
                                <label>Usename</label>
                                <input placeholder="Usename"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Avatar</label>
                                <input placeholder="Avatar"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder="Password"/>
                            </Form.Field>
                            <Form.Field>
                                <label>Confirm Password</label>
                                <input placeholder="Retype Password"/>
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
    title: React.PropTypes.string.isRequired
};

export default SignUpForm;