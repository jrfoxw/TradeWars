/**
 * Created by PY-DEV on 2/27/2017.
 */
import React, { Component } from 'react';
import { Image, Grid, Card, Feed } from 'semantic-ui-react'

class MobStatus extends Component{
    constructor(props){
        super(props);

        this.creature = {attacker:{image:<Image/>,att:0,def:0,hp:0}}
    }



    render(){

        if(this.props.creature) {
            this.creature = this.props.creature;
        }

        console.log("Creature .. ",this.creature);


        return(
            <Grid.Column width="3">


                <div style={{border:"2px solid gray",
                    backgroundColor:"gray",
                    color:"white",
                    padding:"10px",
                    height:"84px",
                    fontSize:"16px",
                }} >
                    <Card>
                        {/*<Image src={avatar} width="32" height="32" avatar/>*/}
                        <Feed>
                            <Feed.Event>
                                <Feed.Label image={this.creature.attacker.image} />
                                <Feed.Content>
                                    <Feed.Date content='Mode: Defense' />
                                    <Feed.Summary>
                                        <span style={{ color:'red' }}>ATT:</span> {this.creature.attacker.att}<br/>
                                        <span style={{ color:'blue' }}>DEF:</span> {this.creature.attacker.def}<br/>
                                        HP: {this.creature.attacker.hp}<br/>
                                    </Feed.Summary>
                                </Feed.Content>
                            </Feed.Event>
                        </Feed>
                    </Card>
                </div>
            </Grid.Column>
        )
    }
}

export default MobStatus;