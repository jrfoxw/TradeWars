import React, {Component} from 'react';
import {Table, Header, Button, Icon, Tab, Form, Grid, Container, Label, Dimmer, Loader, Segment, Menu, Modal} from 'semantic-ui-react';
import Audio from '../../Audio';

class Controls extends Component{
  constructor(props){
    super(props);
    this.state = {
      sounds: null,
      tile: 'floor'
    }
  }

  render(){

    const socket = this.props.socket

    const moveRight = () =>{
      console.log("RIGHT");
      socket.emit('move',{
        msg: "Moving "+socket.id+" Right", dir: [0,+1], id:socket.id,
      })

      if(this.state.tile === 'floor'){
        this.setState({sounds: <Audio/>})
      }
    };

    const moveLeft = () =>{

      this.setState({sounds: <Audio/>})
      console.log("LEFT");
      socket.emit('move',{
        msg: "Moving "+socket.id+" Left",
        dir: [0,-1],
        id:socket.id,
      });

    };


    const moveUp = () =>{

      console.log("UP");
      socket.emit('move',{
        msg: "Moving "+socket.id+" up",
        dir: [-1,0],
        id:socket.id,
      });
      this.setState({sounds: <Audio/>})
    };

    const moveDown = () =>{

      console.log("DOWN");
      socket.emit('move',{
        msg: "Moving "+socket.id+" down",
        dir: [+1,0],
        id:socket.id,
      });
      this.setState({sounds: <Audio/>})
    };

    return(
      <Container>
        <div>
          {this.state.sounds}
        </div>
        <Button name="left" onClick={moveLeft}>
          <Icon name='left chevron'/>
        </Button>
        <Button name="right" onClick={moveRight}>
          <Icon name='right chevron'/>
        </Button>
        <Button name="up" onClick={moveUp}>
          <Icon name='up chevron'/>
        </Button>
        <Button name="down" onClick={moveDown}>
          <Icon name='down chevron'/>
        </Button>
      </Container>
    )
  }

}
export default Controls;
