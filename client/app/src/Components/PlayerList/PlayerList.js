import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Icon, Grid, Table, Header, Image, Divider, Card, Feed} from 'semantic-ui-react';


class PlayerList extends Component {
        constructor(props){
            super(props);
        }



    getPlayers() {



        const plist =  this.props.players;

        const tlist = plist.map((val, key) =>


            <Table.Row key={key}>



                <Table.Cell>
                    <Header as="h4" image>
                        <Image src={val.player_avatar} shape='circular' size="tiny" avatar/>

                    <Header.Content>
                        {val.player_name}

                        <Header.Subheader>
                            {val.player_class} {val.player_level}
                        </Header.Subheader>

                    </Header.Content>
                    </Header>
                </Table.Cell>
                <Header textAlign="center">STATS</Header>
                        <Table padded striped color="blue" inverted size="large">
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Stat</Table.HeaderCell>
                                    <Table.HeaderCell>Base</Table.HeaderCell>
                                    <Table.HeaderCell>Modifier</Table.HeaderCell>
                                    <Table.HeaderCell>Bonus</Table.HeaderCell>
                                    <Table.HeaderCell>Extra</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Row>

                                    <Table.Cell>ATT</Table.Cell>
                                    <Table.Cell>{val.player_att}</Table.Cell>
                                    <Table.Cell>{val.player_att}</Table.Cell>
                                    <Table.Cell>{val.player_att}</Table.Cell>
                                    <Table.Cell>{val.player_att}</Table.Cell>

                            </Table.Row>
                            <Table.Row>

                                    <Table.Cell>DEF</Table.Cell>
                                    <Table.Cell>{val.player_def}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>

                            </Table.Row>
                            <Table.Row>

                                    <Table.Cell>HP</Table.Cell>
                                    <Table.Cell>{val.player_hp}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>

                            </Table.Row>
                            <Table.Row>

                                    <Table.Cell>MP</Table.Cell>
                                    <Table.Cell>{val.player_hp}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>
                                <Table.Cell>{val.player_att}</Table.Cell>

                            </Table.Row>
                        </Table>

                <Header textAlign="center">INVENTORY</Header>
                        <Table striped color="red" inverted>
                            <Table.Header >
                                <Table.Row>
                                    <Table.HeaderCell>Body</Table.HeaderCell>
                                    <Table.HeaderCell>Item</Table.HeaderCell>
                                    <Table.HeaderCell>Use</Table.HeaderCell>
                                    <Table.HeaderCell>Damage</Table.HeaderCell>
                                    <Table.HeaderCell>Protect</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Row>
                                    <Table.Cell>Right Hand</Table.Cell>
                                    <Table.Cell>{val.player_inv.split(', ')[0]}</Table.Cell>
                                    <Table.Cell>No</Table.Cell>
                                    <Table.Cell>+1</Table.Cell>
                                    <Table.Cell>0</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                    <Table.Cell>Head</Table.Cell>
                                    <Table.Cell>{val.player_inv.split(', ')[1]}</Table.Cell>
                                    <Table.Cell>No</Table.Cell>
                                    <Table.Cell>0</Table.Cell>
                                    <Table.Cell>+2</Table.Cell>
                            </Table.Row>
                        </Table>

                    </Table.Row>


                //     <Table.Cell>
                //        <Divider/>
                //     <Header.Content>
                //         Quests Status
                //         <Table celled>
                //             <Table.Row>
                //                 <Header.Subheader>
                //                     <Table.Cell>Completed</Table.Cell>
                //                     <Table.Cell>{val.player_quests[0]}</Table.Cell>
                //                 </Header.Subheader>
                //             </Table.Row>
                //             <Table.Row>
                //                 <Header.Subheader>
                //                     <Table.Cell>In Progress</Table.Cell>
                //                     <Table.Cell>{val.player_quests[1]}</Table.Cell>
                //                 </Header.Subheader>
                //             </Table.Row>
                //         </Table>
                //     </Header.Content>
                // </Table.Cell>




        );


        return tlist
    }


        render(){
            return(
                    <div>
                        {this.getPlayers()}
                    </div>

            )
        }
}



export default PlayerList

