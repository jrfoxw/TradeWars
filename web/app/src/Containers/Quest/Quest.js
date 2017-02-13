/**
 * Created by jrfoxw on 2/12/17.
 */
import React, { Component } from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Roller from '../../Common/diceRoller.js'

class Quest extends Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
        return(
            <Container centered>

                <h2> Quest Mode</h2>
                <Grid.Row>
                    <Grid.Column width="8"
                                 style={{ padding:"5px",
                                 }}>

                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Roller/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Container textAlign='justified'
                                   style={{ margin:"10px",
                                            padding:"16px",
                                            borderTop:"3px solid black" }}>
                        <p>
                            <b style={{ fontSize:22, fontFamily:'fantasy' }}>P</b>braesent sapien massa, convallis a pellentesque nec, egestas non nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur aliquet quam id dui posuere blandit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Cras ultricies ligula sed magna dictum porta. Quisque velit nisi, pretium ut lacinia in, elementum id enim. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.
                        </p>
                        </Container>
                    </Grid.Column>
                </Grid.Row>

            </Container>
        )
    }
}

export default Quest;