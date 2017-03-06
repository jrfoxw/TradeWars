/**
 * Created by PY-DEV on 2/24/2017.
 */
import React, { Component } from 'react';
import { Image, Grid, Card, Feed } from 'semantic-ui-react'

class PlayerStatus extends Component{
        constructor(props){
            super(props);
        }


    render(){
            const avatar = this.props.user.avatar;
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
                                <Feed.Label image={avatar} />
                                <Feed.Content>
                                    <Feed.Date content='Mode: Defense' />
                                    <Feed.Summary>
                                        <span style={{ color:'red' }}>ATT:</span> {this.props.att}<br/>
                                        <span style={{ color:'blue' }}>DEF:</span> {this.props.def}<br/>
                                        HP: {this.props.hp}<br/>
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

export default PlayerStatus;

