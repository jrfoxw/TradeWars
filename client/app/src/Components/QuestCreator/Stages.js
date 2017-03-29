import React, {Component} from 'react';
import {Button, Icon, Form, Grid, Container} from 'semantic-ui-react';

class Stages extends Component{
    constructor(props){
        super(props);
        this.state = {};

    }


    handleOnChange(event, data) {

        event.preventDefault();

        const target = event.target;
        console.log('Target: ',target);
        console.log('Data: ',data);
        if(target.name)
            this.setState({[target.name]: target.value});
        if(data)
            this.setState({[data.name]: data.value})


    }

    render() {
        const quest_type_4 = [
            {key: "two-way", text: "Two-Way", value: "two-way"},
            {key: "one-way", text: "one-way", value: "one-way"},
            {key: "drop-off", text: "drop-off", value: "drop-off"},


        ];

        const quest_type_3 = [
            {key: "goblin", text: "Goblin", value: "goblin"},
            {key: "kobold", text: "kobold", value: "kobold"},
            {key: "berries", text: "Berries", value: "berries"},
            {key: "gems", text: "Gems", value: "gems"},
            {key: "amulet", text: "Amulet", value: "amulet"},

        ];

        const actions = [

            {key: "goto_location", text: "goto_location", value: "goto_location"},
            {key: "hunt_creature", text: "hunt_creature", value: "hunt_creature"},
            {key: "find_item", text: "find_item", value: "find_item"},


        ];

        const quest_type_2 = [

            {key: "npc", text: "Npc", value: "npc"},
            {key: "item", text: "Item", value: "item"},
            {key: "items", text: "Items", value: "items"},
            {key: "location", text: "Location", value: "location"},


        ];

        return (



            <Container>
                <h2>Stages</h2>
                <Form.Group>

                    Stage 1
                    <Form.Select
                        label="Action"
                        type="text"
                        name="stage_intro_action"
                        options={actions}
                        placeholder="Choose type"
                        value={this.state.stage_intro_action}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.Select>
                    <Form.TextArea
                        width="12"
                        label="Intro"
                        name="stage_intro"
                        placeholder="Introduce quest to player, setup scenario"
                        rows="3"
                        value={this.state.stage_intro}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.TextArea>

                </Form.Group>
                <Form.Group>
                    Stage 2
                    <Form.TextArea
                        width="12"
                        label="Mid"
                        name="stage_mid"
                        placeholder="player reaches mid point of quest"
                        rows="3"
                        value={this.state.stage_mid}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.TextArea>

                </Form.Group>
                <Form.Group>
                    Stage 3
                    <Form.TextArea
                        width="12"
                        label="End"
                        name="stage_mid"
                        placeholder="player reaches end of quest"
                        rows="3"
                        value={this.state.stage_end}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.TextArea>

                </Form.Group>

                <Form.Group width="equal" inline>


                    <Form.Select
                        label="Mob"
                        type="text"
                        name="quest_type_2"
                        options={quest_type_2}
                        placeholder="Mob"
                        value={this.state.quest_type_2}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.Select>

                    <Form.Select
                        label="Specific"
                        type="text"
                        name="quest_type_3"
                        options={quest_type_3}
                        placeholder="Specific"
                        value={this.state.quest_type_3}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.Select>

                    <Form.Select
                        label="Goal"
                        type="text"
                        name="quest_type_4"
                        options={quest_type_4}
                        placeholder="Goal?"
                        value={this.state.quest_type_4}
                        onChange={this.props.handleOnChange}
                    >
                    </Form.Select>

                </Form.Group>
            </Container>
        )
    }
}

export default Stages;


