import React, {Component} from 'react';
import ReactHowler from 'react-howler';
import { Button, Icon, Label } from 'semantic-ui-react';



class Audio extends Component{
  constructor(props){
    super(props);
    this.state = {
      stepSound:{
      loop: false,
      play: true
    }
    }
  }



  render(){

    const startLoop = () => {
      this.setState({stepSound:{loop:true,play:true}})
    }

    const stopLoop = () => {
      this.setState({stepSound:{loop:false,play:false}})

    }

    const play = () => {
      this.setState({stepSound:{play:true }})
    }

    const stop = () => {
      this.setState({stepSound:{play:false }})
    }



    return(
      <div>


        <ReactHowler
          src='./sounds/stepSound.mp3'
          playing={this.state.stepSound.play}
          volume={0.5}
          loop={this.state.stepSound.loop}
        />
        {/* <Label>
          Sound Test

          <Button icon onClick={play}>
            <Icon name='play'/>
          </Button>
          <Button onClick={stop}>
            <Icon name='stop'/>
          </Button>
          <Button onClick={startLoop}>
            <Icon name='repeat'/>
          </Button>
        </Label> */}

      </div>
    )
  }
}
export default Audio;
