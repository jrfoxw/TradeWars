import React, { Component } from 'react'
import {Table, Header, Button, Icon, Tab, Form, Grid, Container, Label, Dimmer, Loader, Segment, Menu, Modal} from 'semantic-ui-react';
import io from 'socket.io-client';
import {Layer, Rect, Stage, Group, Image} from 'react-konva';
// import Howl from 'howler';
import ReactHowler from 'react-howler';
import { connect } from 'react-redux';
// import Audio from '../Audio';
import Theme from '../Audio/ambient/dungeon_theme';
import MenuOpen from '../Audio/interactive/interactive_menu';
import Status from '../../Containers/Status/';
import Controls from '../Buttons/controls/';

let socket = io('http://192.168.1.130:3005')


class SocketTest extends Component{
    constructor(props){
      super(props)
      this.state = {
        room : null,
        status: <Status status='no server connected'/>,
        image: null,
        stepSound: {sound:'./sounds/stepSound.mp3', playing:false},
        activeItem: 'Equipped',
        sounds: null,
        tile: 'floor',

      }

      this.tableData=[
          { where:'head',  name:'farmer hat',    def:0,  off:0,  desc:"keeps the sun off"},
          { where:'chest', name:'cheap shirt',   def:1,  off:0,  desc:"feels like scratchy wool"},
          { where:'right', name:'butter knife',  def:0,  off:1,  desc:"Feel lucky its not plastic!"},
          { where:'left',  name:'empty',         def:0,  off:0,  desc:""},
          { where:'legs',  name:'cheap pants',   def:1,  off:0,  desc:"good gardening pants"}
        ]

      // this.roomPNG = "http://192.168.1.130:3001/gamefiles/map/dungeon/game_map.png"

    }

    componentWillMount(){
      socket.on('connection :: status', (data) =>{
        console.debug('Connection status: ',data)
        this.setState({status: <Status status={data}/>})
      })
    }


    componentDidMount(){



      // socket.on('move' ,(data) =>{
      //   console.debug('Data recieved from server.. ',data.data)
      //
      // })

      socket.on('move', (data) =>{

        let img = new window.Image();
        img.src = 'data:image/png;base64,' + data.image;
        img.onload = () => {
          this.setState({image: img})
        }
      })
    }




      stepSound(){
        this.setState({stepSound: <ReactHowler
          src='./sounds/stepSound.mp3'
          playing={true}
          volume={0.5}
                                  />})


      }

      // socket.on('playerInfo',(data) =>{
      //   console.log('Player Temp Data: ',data)
      // })



      // createjs.Sound.play(audioPath+'stepSound.mp3')


    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    soundLoader = (e) => {
      console.info('Loading Sound..')
      this.setState({sounds: <Audio/>})
    }


    tableInfo(){
      console.info('Creating Table Info..')
      let tData = this.tableData.map((data, key) =>
      //   console.log('TData: ',data)
      // }

        <Table.Row key={key}>

          <Table.Cell >{data.where} </Table.Cell>
          <Table.Cell >{data.name} </Table.Cell>
          <Table.Cell >{data.def}  </Table.Cell>
          <Table.Cell >{data.off}  </Table.Cell>
          <Table.Cell >{data.desc} </Table.Cell>


        </Table.Row>

      )
      return tData
    }


    render(){


      const { activeItem } = this.state

      const setRoom = () =>{
        console.log("Updating Room...")
        console.log("This state: ",this.state)


      }


      const playAmbient = () => {
        console.debug('Attempting to play audio...')
         return <ReactHowler
           src='./sounds/ambient_score.mp3'
           playing={true}
           volume={0.6}
           loop={false}
         />

      }



      const showInventory = () => {
        this.setState({ sounds: <MenuOpen/> })
      }

      return(

        <Grid centered columns={2}>





          <Modal dimmer={'blurring'} trigger={<Button name="Inventory" onClick={showInventory}>Inventory</Button>}>
            <Modal.Header>Manage Inventory</Modal.Header>
            <Modal.Content>
              <Modal.Description>

                <Menu tabular attached='top'>
                  <Menu.Item name='Equipped' data-tab="equipped" active={activeItem === "Equipped"} onClick={this.handleItemClick}>

                  </Menu.Item>
                  <Menu.Item name='Backpack' data-tab="backpack" active={activeItem === "Backpack"} onClick={this.handleItemClick}>

                  </Menu.Item>
                  <Segment attached="bottom" data-tab="backpack">
                    <p>Test Data</p>
                  </Segment>
                  <Segment attached="bottom" data-tab="equipped">
                    <p>Test Data 2</p>
                  </Segment>
                </Menu>

                <Header>Equipped</Header>

                <Table definition data-tab="equipped">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Body</Table.HeaderCell>
                      <Table.HeaderCell>Equipped</Table.HeaderCell>
                      <Table.HeaderCell>Defense</Table.HeaderCell>
                      <Table.HeaderCell>Offense</Table.HeaderCell>
                      <Table.HeaderCell>Info</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {this.tableInfo()}

                  </Table.Body>

                </Table>
              </Modal.Description>


            </Modal.Content>
          </Modal>
          <Grid centered columns={1} >
            <Grid.Row>

              

              <Grid.Column>


                <Status socket={socket} />

                <div style={{ height: "700px", width: "700px" ,backgroundColor: "black" }}>
                  <Controls socket={socket}/>
                  <Stage width={700} height={700}>
                    <Layer>
                      <Rect
                        x={10} y={10} width={50} height={50}
                        fill={'blue'}
                        shadowBlur={10}
                      />
                      <Image scaleX={1.5} scaleY={1.5} fill={'black'} image={this.state.image}/>
                    </Layer>
                  </Stage>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid>


      )
    }
}

export default SocketTest;
