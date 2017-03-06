import React, {Component} from 'react';
import {Button, Icon, Form, Grid} from 'semantic-ui-react';
import Stages from './Stages'
import { connect } from 'react-redux';
import _ from 'lodash'
import short from 'short-uuid';


// import { QuestCreator } from '../../Actions/players'

class QuestCreator extends Component {
    constructor(props) {
        super(props);
        this.state = {};


        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

    }


    componentWillMount(){
        let rnd = short.uuid();
        this.setState({quest_id:rnd});

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
        QuestCreator(this.state, this.props.user)
            .then((res) => {
                console.log('Succesfully created player.');
                this.context.router.push('/players')
            }).catch((err) =>{
            console.log("Can't create player.. ",err)
        })


    }

    render() {
        const { title } = this.props.params;



        const quest_repeat = [
            {key:"true",text:"yes",value:"true"},
            {key:"false",text:"no",value:"false"},
        ];


        const quest_difficulty = [
            {key:"easy",text:"Easy",value:"Easy"},
            {key:"medium",text:"medium",value:"medium"},
            {key:"hard",text:"hard",value:"hard"},


        ];

        const quest_enc_difficulty = [
            {key:"easy",text:"easy",value:"easy"},
            {key:"",text:"medium",value:"medium"},
            {key:"hard",text:"hard",value:"hard"},


        ];

        const quest_level = [
            {key:"1_3",text:"1-3",value:"1_3"},
            {key:"3_6",text:"3-6",value:"3_6"},
            {key:"6_9",text:"6-9",value:"6_9"},
            {key:"9_12",text:"9-12",value:"9_12"},
            {key:"12_15",text:"12-15",value:"12_15"},



        ];



        return (

            <Grid columns={1}>
                <Grid.Row centered>

                    <Grid.Column width={8}>
                        <h1> Quest Creator (Admin Only) </h1>
                        <Form width onSubmit={this.handleOnSubmit}>
                            <Form.Group>
                                <Form.Input
                                    width="4"
                                    label="Quest ID"
                                    type="text"
                                    disabled
                                    name="quest_id"
                                    placeholder="uuid"
                                    value={this.state.quest_id}
                                    onChange={this.handleOnChange}
                                    >
                                </Form.Input>

                                <Form.Input
                                    width="16"
                                    label="Quest Title"
                                    type="text"
                                    name="quest_title"
                                    placeholder="A short title for the quest (75 chars)"
                                    value={this.state.quest_title}
                                    onChange={this.handleOnChange}
                                    >
                                </Form.Input>
                            </Form.Group>

                            <Form.Group >

                                <Form.Select
                                    width="4"
                                    label="Levels"
                                    type="number"
                                    name="quest_level"
                                    options={quest_level}
                                    placeholder="level"
                                    value={this.state.quest_level}
                                    onChange={this.handleOnChange}
                                >
                                </Form.Select>

                                <Form.Select
                                    width="4"
                                    label="Repeatable"
                                    type="boolean"
                                    name="repeatable"
                                    options={quest_repeat}
                                    placeholder="true"
                                    value={this.state.quest_repeat}
                                    onChange={this.handleOnChange}
                                >
                                </Form.Select>


                                <Form.Select
                                    width="4"
                                    label="Difficulty"
                                    type="text"
                                    options={quest_difficulty}
                                    name="quest_difficulty"
                                    placeholder="difficulty"
                                    value={this.state.quest_difficulty}
                                    onChange={this.handleOnChange}
                                >
                                </Form.Select>

                                <Form.Select
                                    width="4"
                                    label="Random Encounters"
                                    type="text"
                                    options={quest_enc_difficulty}
                                    name="quest_enc_difficulty"
                                    placeholder="difficulty"
                                    value={this.state.quest_enc_difficulty}
                                    onChange={this.handleOnChange}
                                >
                                </Form.Select>
                            </Form.Group>

                            <Form.TextArea
                                label="Description"
                                name="quest_desc"
                                placeholder="character bio"
                                rows="2"
                                value={this.state.quest_desc}
                                onChange={this.handleOnChange}
                            >
                            </Form.TextArea>

                            <Stages/>



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

QuestCreator.propTypes = {

};

QuestCreator.contextTypes = {
    router: React.PropTypes.object.isRequired,
};

function mapStateToProps(state){
    return{
        user: state.Auth,
    }
}
export default QuestCreator;