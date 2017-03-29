/**
 * Created by PY-DEV on 2/14/2017.
 */
import React, {Component} from 'react';
import { Container, Grid, Table, Header,
         Image, Divider, Menu, Icon, Card, Feed} from 'semantic-ui-react';
import _ from 'lodash';
import PlayerList from '../../Components/PlayerList';

// Redux
import { connect } from 'react-redux';
import { fetchPlayers } from '../../Actions/players';

class Players extends Component{
        constructor(props) {
            super(props)

        }

        componentDidMount(){
            this.props.fetchPlayers({user_id:this.props.user.user.id, password:'1234'});

        }


        showListOfPlayers(){
            console.log('List of Players: ',this.props.players);


           return this.props.players.map((val, key) =>


                   <Card.Content>
                       <Feed>
                           <Feed.Event>
                               <Feed.Label image={val.player_avatar} />
                               <Feed.Content>
                                   <Feed.Date content="Questing" />
                                   <Feed.Summary>
                                       {val.player_name}
                                   </Feed.Summary>
                                   <Feed.Summary>
                                       <Icon name="privacy"/>
                                       {val.player_race} {val.player_class} Level:{val.player_level}
                                   </Feed.Summary>
                               </Feed.Content>
                           </Feed.Event>
                       </Feed>
                   </Card.Content>


            )
        }


        render(){

            const showList = () => {

                this.showListOfPlayers()

            };

            return(
                <Grid centered columns={2}>

                <Grid.Row>
                    <Grid.Column>

                        <Table>
                            <Table.Header>
                                <Card>
                                    <Card.Content>
                                        <Card.Header>
                                            Your Players
                                        </Card.Header>
                                    </Card.Content>

                                    {this.showListOfPlayers()}
                                </Card>

                            </Table.Header>
                            <Table.Body>
                                <PlayerList players={this.props.players}/>

                            </Table.Body>
                        <Table.Footer>

                            <Table.Row>
                                <Table.HeaderCell colSpan='3'>
                                    <Menu floated="right" pagination>
                                        <Menu.Item as="a" icon>
                                            <Icon name="left chevron" />
                                        </Menu.Item>
                                        <Menu.Item as="a">1</Menu.Item>
                                        <Menu.Item as="a">2</Menu.Item>
                                        <Menu.Item as="a">3</Menu.Item>
                                        <Menu.Item as="a">4</Menu.Item>
                                        <Menu.Item as="a" icon>
                                            <Icon name="right chevron"/>
                                        </Menu.Item>
                                    </Menu>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            )
        }

}

Players.PropTypes = {
  players: React.PropTypes.array.isRequired,
};

function mapStateToProps(state){
    return{
        players: state.Players,
        user: state.Auth
    }
}

export default connect(mapStateToProps, { fetchPlayers })(Players);