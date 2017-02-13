/**
 * Created by jrfoxw on 2/11/17.
 */
import React, { Component } from 'react'
import {Button, Select, Icon, Form, Label, Container, Input, Dropdown} from 'semantic-ui-react'
import _ from 'lodash';

class DiceRoller extends Component{
    constructor(props){
        super(props);
        this.state = { numDice: 1,
                       typeDice: 10,
                       textValueDice: 'D20',
                       result: 0};

        this.setTypeDice = this.setTypeDice.bind(this);
        this.getRandom = this.getRandom.bind(this)

    };



     componentDidMount(){
        console.log('TypeDice: ',this.state.typeDice);
        console.log('Current State: ',this.state)
     }




     getRandom(){

            const {numDice, typeDice, result} = this.state;

            let rolls = [];
            for (let d in _.range(0, numDice)) {

                let num = _.random(1, typeDice);
                rolls.push(num);
                console.log("Rolls", rolls);

                this.setState({result: ` ${numDice}D${typeDice} [${rolls}] = ${_.sum(rolls)}`});
                console.log("Sum of Rolls: ", result);
            }
        };

        setTypeDice(event){

        console.log("Dice: ",this.refs);
        if(event.target.value) {
            this.setState({typeDice: 6});
            console.log("Value of Dice: ", event.target.value);

        }
    };


    render(){


        const options = [
            { key: 'D4', text: '4', value:4, ref:"dice" },
            { key: 'D6', text: '6', value: 6 },
            { key: 'D8', text: '8', value: 8 },
            { key: 'D10', text: '10', value: 10 },
            { key: 'D12', text: '12', value: 12 },
            { key: 'D20', text: '20', value: 20 },
            { key: 'D00', text: '00', value: 100 },

        ];



        const setNumDice = (e) => {

            if(e.target.value) {
                console.log("Value of target: ", e.target.value);
                this.setState({numDice: e.target.value});
                console.log("Value of NumDice: ",this.state.numDice);
            }
            // console.log("Value of State: ",this.state);

        };

        return(

            <Container>

        <Input compact type='text' placeholder='020'  action >
            <Label>DICE
            <input type='text'
                   placeholder="Enter Dice Equation"
                   onChange={setNumDice}
            />
            </Label>

            <Label>D
            <Select compact
                    placeholder="D20"
                    options={options}
                    defaultValue={this.state.typeDice}
                    ref={(select) => {this.value = select;}}
                    onChange={this.setTypeDice}

            />
            </Label>

            <Button type='submit'
                    onClick={() => this.getRandom()}>Roll
            </Button>
            <Label>Results
            <input type='text' value={this.state.result}/>
            </Label>
        </Input>



            </Container>
        )
    }
}

export default DiceRoller;






