
import React, {Component} from 'react';
import {Button, Icon, Form, Grid} from 'semantic-ui-react';

import { connect } from 'react-redux';


import { createPlayer } from '../../Actions/players'


class CreatePlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {};


        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }

    handleOnChange(event, data) {

        event.preventDefault();

        const target = event.target;
        // console.log('Target: ',target);
        // console.log('Data: ',data);
        if(target.name)
        this.setState({[target.name]: target.value});
        if(data)
        this.setState({[data.name]: data.value})


    }

    handleOnSubmit(event) {
        event.preventDefault();
        console.log('Props: ',this.props.user);
        console.log('Final State, ',this.state);
        createPlayer(this.state, this.props.user)
            .then((res) => {
            console.log('Succesfully created player.');
            this.context.router.push('/players')
        }).catch((err) =>{
            console.log("Can't create player.. ",err)
        })


    }

    render() {
        const { title } = this.props.params;

        const professions = [
            {key:"warrior",text:"Warrior",value:"warrior"},
            {key:"cleric",text:"Cleric",value:"cleric"},
            {key:"thief",text:"Thief",value:"thief"},
            {key:"mage",text:"Mage",value:"mage"},

        ];

        const races = [

            {key:"human",text:"Human",value:"human"},
            {key:"elf",text:"Elf",value:"elf"},
            {key:"dwarf",text:"Dwarf",value:"dwarf"},
            {key:"hobbit",text:"Hobbit",value:"hobbit"},

        ];

        return (

            <Grid columns={1}>
                <Grid.Row centered>
                    <Grid.Column width={8}>
                        <h1> Player Creator </h1>
                        <Form widths onSubmit={this.handleOnSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text"
                                       name="player_name"
                                       placeholder="character name"
                                       value={this.state.player_name}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>Avatar</label>
                                <input type="text"
                                       name="player_avatar"
                                       placeholder="Avatar"
                                       value={this.state.player_avatar}
                                       onChange={this.handleOnChange}
                                />
                            </Form.Field>
                            <Form.TextArea
                                label="Bio"
                                name="player_bio"
                                placeholder="character bio"
                                value={this.state.player_bio}
                                onChange={this.handleOnChange}
                                >
                            </Form.TextArea>


                            <Form.Select
                                label="Race"
                                type="text"
                                name="player_race"
                                options={races}
                                placeholder="choose players race"
                                value={this.state.player_race}
                                onChange={this.handleOnChange}
                            >
                            </Form.Select>

                            <Form.Select
                                label="Profession"
                                type="text"
                                name="player_class"
                                options={professions}
                                placeholder="choose players profession"
                                value={this.state.player_class}
                                onChange={this.handleOnChange}
                                >
                            </Form.Select>

                            <Button animated="left">
                                <Button.Content visible type='submit'>Done</Button.Content>
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

CreatePlayer.propTypes = {

};

CreatePlayer.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.Auth,
    }
}

export default connect(mapStateToProps, { createPlayer })(CreatePlayer);