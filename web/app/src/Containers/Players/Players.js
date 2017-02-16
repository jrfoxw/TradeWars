/**
 * Created by PY-DEV on 2/14/2017.
 */
import React, {Component} from 'react';
import { Container, Grid, Table, Header, Image, Divider} from 'semantic-ui-react';
import _ from 'lodash'

import image1 from '../../../public/images/es1.jpg';
import image2 from '../../../public/images/hb1.jpg';
import image3 from '../../../public/images/emd1.jpg';


class Players extends Component{
        constructor(props) {
            super(props)
        }


        players() {

            console.log(image1);
            console.log(image2);
            console.log(image3);

            const plist =   [

                {avatar: image1, name: 'Kilgore', level: 5, specialty: 'Warrior', quests: [4,2]},
                {avatar: image2, name: 'Ransack', level: 15, specialty: 'Bard', quests: [8,4]},
                {avatar: image3, name: 'Smiley', level: 8, specialty: 'Cleric', quests: [2,5]},


            ];

          const tlist = plist.map((val, key) =>

             <Table.Row key={key}>
                 <Table.Cell>
                     <Header as="h4" image>
                         <Image src={val.avatar} shape='rounded' size="mini"/>

                     <Header.Content>
                         {val.name}

                         <Header.Subheader>
                             {val.specialty} {val.level}
                         </Header.Subheader>
                     </Header.Content>
                        <Divider/>
                     <Header.Content>
                         Quests Status
                         <Table celled>
                             <Table.Row>
                                 <Header.Subheader>
                                     <Table.Cell>Completed</Table.Cell>
                                     <Table.Cell>{val.quests[0]}</Table.Cell>
                                 </Header.Subheader>
                             </Table.Row>
                             <Table.Row>
                                 <Header.Subheader>
                                     <Table.Cell>In Progress</Table.Cell>
                                     <Table.Cell>{val.quests[1]}</Table.Cell>
                                 </Header.Subheader>
                             </Table.Row>
                         </Table>
                     </Header.Content>
                     </Header>
                 </Table.Cell>

             </Table.Row>

         );

            console.log('Player List: ',plist);
            return tlist
        }


        render(){
            return(
                <Grid centered columns={2}>
                <Grid.Row>
                    <Grid.Column>
                        <Table>
                            <Table.Header>
                                <Table.Row>

                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {this.players()}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
                </Grid>
            )
        }


}

export default Players;