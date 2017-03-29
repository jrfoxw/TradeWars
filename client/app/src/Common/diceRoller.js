/**
 * Created by jrfoxw on 2/11/17.
 */
import React, { Component } from 'react'
import {Button, Select, Icon, Form, Label, Container, Input, Dropdown} from 'semantic-ui-react'
import _ from 'lodash';

class DiceRoller extends Component{
    constructor(props){
        super(props);
        this.state = { numDice: "",
                       typeDice: "",
                       textValueDice: 'D20',
                       result: 0};

        this.setTypeDice = this.setTypeDice.bind(this);
        this.setNumDice  = this.setNumDice.bind(this);
        this.getRandom   = this.getRandom.bind(this);

    };



     componentDidMount(){
        console.log('TypeDice: ',this.state.typeDice);
        console.log('Current State: ',this.state)
     }




    setNumDice = (event) => {

    if(event.target.value) {
        this.setState({numDice:""});
        console.log("Value of target: ", event.target.value);
        this.setState({numDice: event.target.value});
        console.log("Value of NumDice: ",this.state.numDice);
    }
    // console.log("Value of State: ",this.state);
};


    setTypeDice = (event) =>{

    const target = event.target;
    console.log("Dice: ",target.value);
    if(target.value) {
        this.setState({typeDice:target.value});
        console.log("Value of Dice: ", this.state);

    }
};


     getRandom(){

            const {numDice, typeDice, result} = this.state;
            typeDice === '00' ? this.setState({typeDice: 100}) : typeDice;
            let rolls = [];
            for (let d in _.range(0, numDice)) {

                let num = _.random(1, typeDice);
                rolls.push(num);
                console.log("Rolls", rolls);

                this.setState({result: ` ${numDice}D${typeDice} [${rolls}] = ${_.sum(rolls)}`});
                console.log("Sum of Rolls: ", result);
            }
        };




    render(){


        const options = [

            {'name':'D04', 'die':4 },
            {'name':'D06', 'die':6 },
            {'name':'D08', 'die':8 },
            {'name':'D10', 'die':10 },
            {'name':'D12', 'die':12 },
            {'name':'D20', 'die':20 },
            {'name':'D00', 'die':'00' },

        ];

        const option = _.map(options, (val, key) =>
            <option key={key} value={val.die}>{val.name}</option>
        );





        return(

            <Container>

        <Input compact type='text' placeholder='020'  action >
            <Label>DICE
            <input type='text'
                   placeholder="Enter Dice Equation"
                   onChange={this.setNumDice}
            />
            </Label>

            <select
                value={this.state.typeDice}
                onChange={this.setTypeDice}
                onClick={this.setTypeDice}

            >   <option value=''>TYPE</option>
                {option}

            </select>



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






